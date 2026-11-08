import type { Metadata } from "next";
import Link from "next/link";
import { samplePosts } from "@/lib/sample-feed";

export const metadata: Metadata = {
  title: "Профіль майстра · BeautySaaS",
};

const posts = [
  { id: "1", title: "Вечірній макіяж", caption: "Зйомка для портфоліо, тепле світло." },
  { id: "2", title: "Колір волосся", caption: "Холодний блонд, до і після." },
  { id: "3", title: "Брови", caption: "Ламінування, натуральна форма." },
  { id: "4", title: "Укладка", caption: "Збори перед подією." },
  { id: "5", title: "TFP", caption: "Шукаю модель на творчу серію." },
  { id: "6", title: "Догляд", caption: "Відновлення після освітлення." },
];

export default async function MasterProfilePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ view?: string }>;
}) {
  const { id } = await params;
  const { view } = await searchParams;
  const layout = view === "threads" ? "threads" : "grid";
  const master = samplePosts.find((post) => post.masterId === id);

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-4 py-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold tracking-tight">
            {master?.masterName ?? "Профіль майстра"}
          </h1>
          <p className="text-sm text-stone-500">{master?.location ?? id}</p>
        </div>
        <Link
          href={`/master/${id}/book`}
          className="rounded-full bg-stone-900 px-4 py-2 text-sm text-white"
        >
          Записатися
        </Link>
      </header>

      <div className="flex gap-2 text-sm">
        <Link
          href={`/master/${id}?view=grid`}
          className={`rounded-full px-3 py-1 ${
            layout === "grid" ? "bg-stone-900 text-white" : "bg-white text-stone-700"
          }`}
        >
          Сітка
        </Link>
        <Link
          href={`/master/${id}?view=threads`}
          className={`rounded-full px-3 py-1 ${
            layout === "threads" ? "bg-stone-900 text-white" : "bg-white text-stone-700"
          }`}
        >
          Стрічка
        </Link>
      </div>

      {layout === "grid" ? (
        <ul className="grid grid-cols-3 gap-1 sm:gap-2">
          {posts.map((post) => (
            <li key={post.id}>
              <div className="flex aspect-square items-end rounded-xl bg-stone-200 p-3">
                <span className="text-sm font-medium">{post.title}</span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <ol className="mx-auto w-full max-w-xl space-y-4">
          {posts.map((post) => (
            <li key={post.id} className="rounded-3xl border border-stone-200 bg-white p-5">
              <h2 className="text-lg font-semibold">{post.title}</h2>
              <p className="mt-2 text-stone-700">{post.caption}</p>
            </li>
          ))}
        </ol>
      )}
    </main>
  );
}
