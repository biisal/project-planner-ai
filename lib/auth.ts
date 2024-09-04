import { User } from "@/lib/database/models/model.user";
import { NextAuthOptions } from "next-auth";

import connectToDB from "@/lib/database/mongoose";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn({ user, account, profile }) {
      await connectToDB();
      const { email, image } = user;
      let userExists = await User.findOne({ email });

      if (!userExists) {
        userExists = await User.create({
          name: user.name, // Use the name from the Google profile initially
          email,
          image,
        });
      } else {
        user.name = userExists.name;
        userExists.image = image!;
        await userExists.save();
      }

      return true;
    },

    async session({ session, token }) {
      await connectToDB();
      const sessionUser = await User.findOne({ email: token.email });
      if (sessionUser && session.user) {
        session.user.name = sessionUser.name;
        session.user.image = sessionUser.image;
      }

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;
      }
      return token;
    },
  },
};
