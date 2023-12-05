

export { default } from "next-auth/middleware"

export const config = {
  matcher: ['/create/:path*', '/forms/:path*','/edit/:path*','/profile/:path*'],
};
