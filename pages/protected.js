import {useSession} from "next-auth/react";
import {useRouter} from "next/router";
import {checkRefreshTokenError} from "@/util/checkRefreshTokenError";

export default function ProtectedPage() {
  const router = useRouter();
  const {data: session, status} = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });

  checkRefreshTokenError();

  if (status === "loading") {
    return null;
  }

  return (
    <div className="hero">
      <h1>Protected Page</h1>
      <p>Welcome, {JSON.stringify(session.user.email)}</p>
    </div>
  );
}
