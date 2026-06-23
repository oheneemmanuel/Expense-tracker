import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // This function runs after authentication checks pass
  },
  {
    pages: {
      signIn: "/api/auth/signin", // Force redirects here if unauthenticated
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*"],
};