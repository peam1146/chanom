import { withAuth } from "next-auth/middleware";
import { env } from "./env";

export const middleware = withAuth({
  secret: env.NEXTAUTH_SECRET,
  callbacks: {
    authorized: ({ req }) => {
      const sessionToken = req.cookies.get("next-auth.session-token");
      if (sessionToken) return true;
      else return false;
    },
  },
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|login).*)", "/"],
};
