import { loginWithOtherSocials } from "@/widgets/Auth";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { cookies } from "next/headers";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      // prompt: 'select_account' // uncomment this line if you want to always show the account selection screen
    }),
  ],
  secret: process.env.SECRET,

  callbacks: {
    async signIn({ account, profile }) {
      if (!account || !profile) return;

      try {
        const data = await loginWithOtherSocials({
          // @ts-nocheck
          id: profile.sub || "",
          email: profile.email || "",
          name: profile.name || "",
          type: "google",
        });
        cookies().set("_token", data.token, { maxAge: 30 * 24 * 60 * 60 });
      } catch (error) {
        console.log("error", error);
      }

      if (account.provider !== "google") {
        // @ts-ignore
        return profile.email_verified && profile.email.endsWith("@example.com");
      }
      return true;
    },
  },
});

export { handler as GET, handler as POST };
