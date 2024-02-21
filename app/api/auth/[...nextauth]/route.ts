import { loginWithOtherSocials } from "@/widgets/Auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { setCookie } from "nookies";

console.log("env", process.env.GOOGLE_CLIENT_ID);
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      // prompt: 'select_account' // uncomment this line if you want to always show the account selection screen
    }),
  ],
  secret: process.env.SECRET,

  callbacks: {
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      console.log(session, token, user, user.id);
      // @ts-ignore
      const id = user.sub;
      loginWithOtherSocials({
        id: id,
        email: user.email,
        name: user.name || "",
        type: "google",
      }).then((res) => {
        console.log("res", res);
        setCookie(null, "_token", res, {
          path: "/",
        });
      });

      return session;
    },
  },
});

export { handler as GET, handler as POST };
