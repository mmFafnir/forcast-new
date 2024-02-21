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

  // callbacks: {
  //   async session({ session, token, user }) {

  //     console.log("session", session);
  //     console.log("token", token);
  //     console.log("user", user);

  //     if (session.user) {
  //       loginWithOtherSocials({
  //         // @ts-nocheck
  //         id: token.sub || "",
  //         email: session.user.email || "",
  //         name: session.user.name || "",
  //         type: "google",
  //       }).then((res) => {
  //         console.log("res", res);
  //         setCookie(null, "_token", res, {
  //           path: "/",
  //         });
  //       });
  //     }

  //     return session;
  //   },
  // },
});

export { handler as GET, handler as POST };
