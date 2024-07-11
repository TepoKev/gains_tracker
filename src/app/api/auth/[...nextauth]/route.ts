import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/libs/db";
import { comparePassword } from "@/libs/auth";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "kevin" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        const userFound = await db.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });
        if (!userFound) throw new Error("User Not Found");
        const matchPassword = await comparePassword(
          credentials?.password,
          userFound.password
        );
        if (!matchPassword) throw new Error("Wrong Password");
        return {
          id: userFound.id,
          name: userFound.firstName + " " + userFound.lastName,
          email: userFound.email,
        };
      },
    }),
  ],
  pages:{
    signIn: "/auth/signin"
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
