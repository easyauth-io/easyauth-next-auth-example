import NextAuth from "next-auth";
import EasyAuth from "@easyauth.io/easyauth-next-auth";

export const authOptions = {
  providers: [
    EasyAuth({
      clientId: process.env.EASYAUTH_CLIENT_ID,
      clientSecret: process.env.EASYAUTH_CLIENT_SECRET,
      tenantURL: process.env.EASYAUTH_TENANT_URL,
    }),
  ],
  secret: "my-secret",
  callbacks: {
    async jwt({token, account, profile}) {
      //Refresh token implementation
      if (account) {
        return {
          access_token: account.access_token,
          expires_at: account.expires_at,
          refresh_token: account.refresh_token,
          ...token,
        };
      } else if (Date.now() < token.expires_at * 1000) {
        return token;
      } else {
        try {
          const response = await fetch(
            new URL(
              "/tenantbackend/oauth2/token",
              process.env.EASYAUTH_TENANT_URL
            ),
            {
              headers: {"Content-Type": "application/x-www-form-urlencoded"},
              body: new URLSearchParams({
                client_id: process.env.EASYAUTH_CLIENT_ID,
                client_secret: process.env.EASYAUTH_CLIENT_SECRET,
                grant_type: "refresh_token",
                refresh_token: token.refresh_token,
              }),
              method: "POST",
            }
          );

          const tokens = await response.json();

          if (!response.ok) throw tokens;

          return {
            ...token, // Keep the previous token properties
            access_token: tokens.access_token,
            expires_at: Math.floor(Date.now() / 1000 + tokens.expires_in),
            refresh_token: tokens.refresh_token ?? token.refresh_token,
          };
        } catch (error) {
          console.error("Error refreshing access token", error);
          return {...token, error: "RefreshAccessTokenError"};
        }
      }
    },
    async session({session, token}) {
      session.error = token.error;
      return session;
    },
  },
};
export default NextAuth(authOptions);
