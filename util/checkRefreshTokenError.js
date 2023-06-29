import {signIn, useSession} from "next-auth/react";
import {useEffect} from "react";

export function checkRefreshTokenError() {
  const {data: session} = useSession();

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      // Force sign in to resolve error
      // Generally the error is due to expired Refresh token.
      signIn("easyauth");
    }
  }, [session]);
}
