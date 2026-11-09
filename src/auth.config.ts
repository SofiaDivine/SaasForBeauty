import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

export function isGoogleAuthConfigured() {
  return Boolean(
    process.env.AUTH_SECRET &&
      process.env.AUTH_GOOGLE_ID &&
      process.env.AUTH_GOOGLE_SECRET,
  );
}

export const authConfig = {
  trustHost: true,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: isGoogleAuthConfigured() ? [Google] : [],
  callbacks: {
    authorized({ auth, request }) {
      if (request.nextUrl.pathname.startsWith("/profile")) {
        return !!auth?.user;
      }
      return true;
    },
  },
} satisfies NextAuthConfig;
