import { db } from "@/app/_lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth/next";
import { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";

console.log(process.env.GOOGLE_CLIENT_ID, "process.env.GOOGLE_CLIENT_ID");
console.log(
  process.env.GOOGLE_CLIENT_SECRET,
  "process.env.GOOGLE_CLIENT_SECRET",
);
const handler = NextAuth({
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      session.user = { ...session.user, id: user.id };
      return session;
    },
  },
});

export { handler as GET, handler as POST };
