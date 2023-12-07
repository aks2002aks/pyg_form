import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        emailOrPhone: {
          label: "Email or Phone",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        if (!credentials) {
          return null;
        }

        const isEmail = credentials.emailOrPhone.includes("@");
        let credentialDetails: Record<string, string>;

        if (isEmail) {
          credentialDetails = {
            email: credentials.emailOrPhone,
            password: credentials.password,
          };
        } else {
          credentialDetails = {
            phone: credentials.emailOrPhone,
            password: credentials.password,
          };
        }

        const response = await fetch("http://localhost:4000/api/login", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentialDetails),
        });

        const { success, user, message } = await response.json();
        if (success) {
          return user;
        } else {
          throw new Error(message);
        }
      },
    }),
  ],
  pages: {
    signIn: "/user/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24, // 1 days
  },
  secret: process.env.SECRET,
  callbacks: {
    jwt: async ({ token, user }: { token: any; user: any }) => {
      if (user) {
        token.id = user._id;
        token.email = user.email;
        token.phone = user.phone;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.role = user.role;
        token.isEmailVerified = user.isEmailVerified;
        token.isPhoneVerified = user.isPhoneVerified;
        token.updatedAt = user.updatedAt;
        token.createdAt = user.createdAt;
      }
      return token;
    },

    session: ({
      session,
      token,
      user,
    }: {
      session: any;
      token: any;
      user: any;
    }) => {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.phone = token.phone;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
        session.user.role = token.role;
        session.user.isEmailVerified = token.isEmailVerified;
        session.user.isPhoneVerified = token.isPhoneVerified;
        session.user.updatedAt = token.updatedAt;
        session.user.createdAt = token.createdAt;
      }
      return session;
    },
  },
};
