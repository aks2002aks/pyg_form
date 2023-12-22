export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/create/:path*",
    "/forms",
    "/forms/editResponse",
    "/edit/:path*",
    "/profile",
  ],
};
