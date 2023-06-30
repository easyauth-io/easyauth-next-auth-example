import {useSession} from "next-auth/react";
import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import {checkRefreshTokenError} from "@/util/checkRefreshTokenError";

export default function Profile() {
  const router = useRouter();
  const {data: session, status} = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });
  const [easyAuthProfile, setEasyAuthProfile] = useState({});

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
    <div>
      <h1>EasyAuth profile</h1>
      {easyAuthProfile && JSON.stringify(easyAuthProfile)}
    </div>
  );
}
