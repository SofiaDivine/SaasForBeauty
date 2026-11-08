import type { Metadata } from "next";
import Link from "next/link";

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

export default async function MyProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab } = await searchParams;
  const current: TabId = tabs.some((item) => item.id === tab)
    ? (tab as TabId)
    : "subscriptions";
  const panel = panels[current];

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-4 py-8">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight">Мій профіль</h1>
        <p className="text-stone-600">Підписки, збережені пости і записи.</p>
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
