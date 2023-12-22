import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
      createdAt: string;
      updatedAt: string;
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      isEmailVerified: boolean;
      isPhoneVerified: boolean;
      profileImageUrl: string;
      role: string;
    };
  }
}
