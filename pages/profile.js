import {useSession} from "next-auth/react";
import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import {checkRefreshTokenError} from "@/util/checkRefreshTokenError";
import Link from "next/link";

export default function Profile() {
  const router = useRouter();
  const {data: session, status} = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });
  const [easyAuthProfile, setEasyAuthProfile] = useState(null);

  checkRefreshTokenError();

  useEffect(() => {
    if (session) {
      fetch(
        new URL(
          "/tenantbackend/api/profile",
          process.env.NEXT_PUBLIC_EASYAUTH_TENANT_URL
        ),
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session.user.access_token}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => setEasyAuthProfile(data))
        .catch((err) => console.error("Failed to fetch EasyAuth profile"));
    }
  }, [status]);

  if (status === "loading") {
    return null;
  }

  return (
    <div className="hero">
      <h3>EasyAuth profile</h3>
      <p>{easyAuthProfile && JSON.stringify(easyAuthProfile)}</p>
      <Link href={"/"}>
        <button>Home page</button>
      </Link>
    </div>
  );
}
