import { headers } from "next/headers";

const fallback = "/profile/me";

export async function safeCallbackUrl(value: string | undefined) {
  if (!value) return fallback;
  if (value.startsWith("/") && !value.startsWith("//") && !value.includes("\\")) {
    return value;
  }

  try {
    const url = new URL(value);
    const host = (await headers()).get("host");
    if (host && url.host === host) {
      return `${url.pathname}${url.search}`;
    }
  } catch {
    return fallback;
  }

  return fallback;
}
