import Link from "next/link";
import { Suspense } from "react";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { getSession } from "@/lib/session";

const links = [
  { href: "/", label: "Стрічка" },
  { href: "/feed/tfp", label: "TFP" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-stone-200 bg-white">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          TFP-Bundle
        </Link>
        <nav className="flex flex-wrap items-center gap-4 text-sm text-stone-600">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-stone-900">
              {link.label}
            </Link>
          ))}
          <Suspense fallback={<span className="inline-block h-4 w-14 rounded bg-stone-200" aria-hidden />}>
            <AccountLink />
          </Suspense>
        </nav>
      </div>
    </header>
  );
}

async function AccountLink() {
  const session = await getSession();

  if (!session?.user) {
    return (
      <Link href="/login" className="hover:text-stone-900">
        Увійти
      </Link>
    );
  }

  const label = session.user.name ?? session.user.email ?? "Мій профіль";

  return (
    <>
      <Link href="/profile/me" className="hover:text-stone-900">
        {label}
      </Link>
      <SignOutButton />
    </>
  );
}
