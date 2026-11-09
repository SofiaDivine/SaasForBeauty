import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { SavePostButton } from "@/components/master/save-post-button";
import { formatKyivVisit, formatServicePrice, TFP_VISIT_NOTE } from "@/lib/booking";
import { getCurrentUser } from "@/lib/current-user";
import { listMyBookings } from "@/lib/my-bookings";
import { listSavedPosts } from "@/lib/saved-posts";
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

const postTypeLabel = {
  TFP: "TFP",
  PROMO: "Акція",
  GIVEAWAY: "Розіграш",
  NEW_ITEM: "Новинка",
} as const;

const bookingStatusLabel = {
  PENDING: "Очікує",
  CONFIRMED: "Підтверджено",
  CANCELLED: "Скасовано",
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
  const savedPosts = current === "saved" ? await listSavedPosts() : [];
  const bookings = current === "bookings" ? await listMyBookings() : [];
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
      {current === "saved" && savedPosts.length > 0 ? (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Збережене</h2>
          <ul className="space-y-3">
            {savedPosts.map((post) => (
              <li key={post.id}>
                <article className="flex gap-4 rounded-3xl border border-stone-200 bg-white p-4">
                  {post.cover ? (
                    <img
                      src={post.cover}
                      alt=""
                      className="h-20 w-20 shrink-0 rounded-2xl object-cover"
                    />
                  ) : null}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-stone-500">
                      {post.masterName} · {postTypeLabel[post.type]}
                    </p>
                    <h3 className="mt-1 font-semibold">{post.title}</h3>
                    {post.content ? (
                      <p className="mt-1 line-clamp-2 text-sm text-stone-600">{post.content}</p>
                    ) : null}
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <Link
                        href={`/master/${post.masterId}?view=threads&post=${post.id}`}
                        className="rounded-full bg-stone-900 px-4 py-2 text-sm text-white"
                      >
                        Відкрити
                      </Link>
                      <SavePostButton postId={post.id} saved />
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </section>
      ) : current === "bookings" && bookings.length > 0 ? (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Мої записи</h2>
          <ul className="space-y-3">
            {bookings.map((booking) => (
              <li key={booking.id}>
                <article className="rounded-3xl border border-stone-200 bg-white p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-sm text-stone-500">{booking.masterName}</p>
                      <h3 className="mt-1 font-semibold">{booking.serviceTitle}</h3>
                      <p className="mt-1 text-sm text-stone-700">
                        {formatKyivVisit(booking.dateTime)} · {booking.durationMinutes} хв ·{" "}
                        {formatServicePrice(booking)}
                      </p>
                      {booking.isTfp ? (
                        <p className="mt-2 text-sm text-stone-600">{TFP_VISIT_NOTE}</p>
                      ) : null}
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        booking.status === "CONFIRMED"
                          ? "bg-emerald-100 text-emerald-950"
                          : booking.status === "CANCELLED"
                            ? "bg-stone-200 text-stone-600"
                            : "bg-amber-100 text-amber-950"
                      }`}
                    >
                      {bookingStatusLabel[booking.status]}
                    </span>
                  </div>
                  <Link
                    href={`/master/${booking.masterId}`}
                    className="mt-3 inline-flex rounded-full bg-stone-900 px-4 py-2 text-sm text-white"
                  >
                    Профіль майстра
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <section className="rounded-3xl border border-dashed border-stone-300 bg-white p-6">
          <h2 className="text-lg font-semibold">{panel.title}</h2>
          <p className="mt-2 text-stone-600">{panel.empty}</p>
        </section>
      )}
    </main>
  );
}
