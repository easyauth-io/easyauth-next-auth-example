import {signOut, useSession} from "next-auth/react";
import {useEffect} from "react";

export function checkRefreshTokenError() {
  const {data: session} = useSession();

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      // Force sign out to resolve error
      // Generally the error is due to expired Refresh token.
      signOut({redirect: false}).then(() => {
        // To signout from EasyAuth Tenant.
        window.location.assign(
          `${process.env.NEXT_PUBLIC_EASYAUTH_TENANT_URL}/logout?target=${btoa(
            window.location.href
          )}`
        );
      });
    }
  }, [session]);
}
