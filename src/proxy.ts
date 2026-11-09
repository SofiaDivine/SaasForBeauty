import NextAuth from "next-auth";
import type { NextFetchEvent, NextRequest } from "next/server";
import { authConfig } from "@/auth.config";

const { auth } = NextAuth(authConfig);

// Auth.js treats a Request argument as middleware, but its public types do not list that call.
const handle = auth as unknown as (
  request: NextRequest,
  event: NextFetchEvent,
) => ReturnType<typeof auth>;

// Next.js only accepts a function declaration here. A renamed const is ignored.
export function proxy(request: NextRequest, event: NextFetchEvent) {
  return handle(request, event);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
