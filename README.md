[NextAuth](https://next-auth.js.org/) authentication using [EasyAuth provider](https://github.com/easyauth-io/easyauth-next-auth).

## Getting Started

1. Sign in to [EasyAuth](https://easyauth.io) and create a new 'Registered Client' with redirect URI set to `http://127.0.0.1:3000/auth/easyauth/callback`.

2. Clone the sample app.

   `git clone https://github.com/easyauth-io/easyauth-next-auth-example.git`

3. Copy `.env` into `.env.local`

   `cp .env .env.local`

4. Edit `.env.local` and set the parameters from your 'Registered Client' that you created in Step 1.

5. Run `npm install` followed by `npm run dev`

6. Visit [http://127.0.0.1:3000](http://127.0.0.1:3000)

**Note**:

1. Replace the port `3000` in `.env.local` and redirect URI with the corresponding port where your app is runing.
2. Add `http://127.0.0.1:3000` to the allowed origins at Registered Clients to fetch EasyAuth profile info.
