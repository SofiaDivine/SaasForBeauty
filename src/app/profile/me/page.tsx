import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { getCurrentUser } from "@/lib/current-user";
import { getSession } from "@/lib/session";

export const metadata: Metadata = {
  title: "Мій профіль · TFP-Bundle",
};

const tabs = [
  { id: "subscriptions", label: "Підписки" },
  { id: "saved", label: "Збережене" },
  { id: "bookings", label: "Мої записи" },
] as const;

type TabId = (typeof tabs)[number]["id"];

const panels: Record<TabId, { title: string; empty: string }> = {
  subscriptions: {
    title: "Підписки",
    empty: "Тут з’являться майстри, на яких ви підписані.",
  },
  saved: {
    title: "Збережене",
    empty: "Тут з’являться пости, які ви зберегли.",
  },
  bookings: {
    title: "Мої записи",
    empty: "Тут з’являться ваші візити: очікують, підтверджені або скасовані.",
  },
};

const roleLabel = {
  USER: "Користувач",
  PRO_MASTER: "Майстер",
} as const;

export default function MyProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  return (
    <Suspense
      fallback={
        <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 text-sm text-stone-600">
          Завантажуємо профіль…
        </main>
      }
    >
      <ProfileContent searchParams={searchParams} />
    </Suspense>
  );
}

async function ProfileContent({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const session = await getSession();
  if (!session?.user) {
    redirect("/login?callbackUrl=/profile/me");
  }

  const user = await getCurrentUser();
  if (!user) {
    return (
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-4 px-4 py-8">
        <h1 className="text-3xl font-semibold tracking-tight">Мій профіль</h1>
        <p className="text-stone-600">Профіль для цієї сесії не знайдено.</p>
        <SignOutButton className="w-fit rounded-full bg-stone-900 px-4 py-2 text-sm text-white" />
      </main>
    );
  }

  const { tab } = await searchParams;
  const current: TabId = tabs.some((item) => item.id === tab) ? (tab as TabId) : "subscriptions";
  const panel = panels[current];
  const initial = (user.name ?? user.email).slice(0, 1).toUpperCase();

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-4 py-8">
      <header className="flex items-center gap-4">
        {user.avatar ? (
          <img
            src={user.avatar}
            alt=""
            referrerPolicy="no-referrer"
            className="h-14 w-14 rounded-full object-cover"
          />
        ) : (
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-stone-200 text-lg font-medium">
            {initial}
          </span>
        )}
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold tracking-tight">{user.name ?? "Мій профіль"}</h1>
          <p className="text-stone-600">
            {user.email} · {roleLabel[user.role]}
          </p>
        </div>
      </header>
      <div className="flex flex-wrap gap-2">
        {tabs.map((item) => (
          <Link
            key={item.id}
            href={item.id === "subscriptions" ? "/profile/me" : `/profile/me?tab=${item.id}`}
            className={`rounded-full px-3 py-1 text-sm ${
              current === item.id ? "bg-stone-900 text-white" : "bg-white text-stone-700"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
      <section className="rounded-3xl border border-dashed border-stone-300 bg-white p-6">
        <h2 className="text-lg font-semibold">{panel.title}</h2>
        <p className="mt-2 text-stone-600">{panel.empty}</p>
      </section>
    </main>
  );
}
