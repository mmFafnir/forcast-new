import { loginWithOtherSocials } from "@/widgets/Auth";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

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
      if (!session.user) return session;

      try {
        const data = await loginWithOtherSocials({
          // @ts-nocheck
          id: token.sub || "",
          email: session.user.email || "",
          name: session.user.name || "",
          type: "google",
        });

        session.user = data.user;
        // @ts-ignore
        session.token = data.token;
        return session;
      } catch (error) {
        console.log("error", error);
        return session;
      }
    },
  },
});

export { handler as GET, handler as POST };
