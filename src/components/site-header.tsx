import Link from "next/link";

const links = [
  { href: "/", label: "Стрічка" },
  { href: "/feed/tfp", label: "TFP" },
  { href: "/profile/me", label: "Мій профіль" },
  { href: "/login", label: "Увійти" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-stone-200 bg-white">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          BeautySaaS
        </Link>
        <nav className="flex flex-wrap items-center gap-4 text-sm text-stone-600">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-stone-900">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
