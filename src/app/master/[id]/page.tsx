import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { MasterFeed, type MasterFeedPost } from "@/components/master/MasterFeed";
import { samplePosts } from "@/lib/sample-feed";

export const metadata: Metadata = {
  title: "Профіль майстра · TFP-Bundle",
};

const gallery: Array<
  Pick<MasterFeedPost, "id" | "type" | "title" | "content" | "mediaUrls">
> = [
  {
    id: "1",
    type: "NEW_ITEM",
    title: "Вечірній макіяж",
    content: "Зйомка для портфоліо, тепле світло.",
    mediaUrls: ["https://picsum.photos/id/1011/900/900"],
  },
  {
    id: "2",
    type: "PROMO",
    title: "Колір волосся",
    content: "Холодний блонд, до і після. Цього тижня фарбування зі знижкою.",
    mediaUrls: ["https://picsum.photos/id/1015/900/900"],
  },
  {
    id: "3",
    type: "NEW_ITEM",
    title: "Брови",
    content: "Ламінування, натуральна форма.",
    mediaUrls: ["https://picsum.photos/id/1027/900/900"],
  },
  {
    id: "4",
    type: "GIVEAWAY",
    title: "Укладка",
    content: "Розігрую укладку перед подією серед тих, хто збереже пост.",
    mediaUrls: ["https://picsum.photos/id/106/900/900"],
  },
  {
    id: "5",
    type: "TFP",
    title: "TFP",
    content: "Шукаю модель на творчу серію. Грим і укладка за фото.",
    mediaUrls: [
      "https://picsum.photos/id/1074/900/900",
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    ],
  },
  {
    id: "6",
    type: "PROMO",
    title: "Догляд",
    content: "Відновлення після освітлення за ціною акції.",
    mediaUrls: ["https://picsum.photos/id/1033/900/900"],
  },
  {
    id: "7",
    type: "NEW_ITEM",
    title: "Ламінування",
    content: "Нова послуга: ламінування брів і вій.",
    mediaUrls: ["https://picsum.photos/id/1025/900/900"],
  },
  {
    id: "8",
    type: "GIVEAWAY",
    title: "Весільний образ",
    content: "Розіграш пробного весільного макіяжу.",
    mediaUrls: ["https://picsum.photos/id/996/900/900"],
  },
  {
    id: "9",
    type: "TFP",
    title: "Портфоліо",
    content: "Творча зйомка для портфоліо, шукаю типаж.",
    mediaUrls: [
      "https://picsum.photos/id/1003/900/900",
      "https://picsum.photos/id/1016/900/900",
    ],
  },
];

export default function MasterProfilePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ view?: string }>;
}) {
  return (
    <Suspense fallback={<p className="px-4 py-8 text-sm text-stone-600">Завантажуємо профіль…</p>}>
      <MasterProfileContent params={params} searchParams={searchParams} />
    </Suspense>
  );
}

async function MasterProfileContent({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ view?: string }>;
}) {
  const { id } = await params;
  const { view } = await searchParams;
  const gridLayout = view === "threads" ? "THREADS_FEED" : "INSTAGRAM_GRID";
  const master = samplePosts.find((post) => post.masterId === id);
  const masterName = master?.masterName ?? "Майстер";
  const posts: MasterFeedPost[] = gallery.map((post) => ({
    ...post,
    masterId: id,
    masterName,
    masterAvatarUrl: "https://picsum.photos/id/1027/200/200",
  }));

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-4 py-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold tracking-tight">
            {masterName}
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
            gridLayout === "INSTAGRAM_GRID" ? "bg-stone-900 text-white" : "bg-white text-stone-700"
          }`}
        >
          Сітка
        </Link>
        <Link
          href={`/master/${id}?view=threads`}
          className={`rounded-full px-3 py-1 ${
            gridLayout === "THREADS_FEED" ? "bg-stone-900 text-white" : "bg-white text-stone-700"
          }`}
        >
          Стрічка
        </Link>
      </div>

      <MasterFeed posts={posts} gridLayout={gridLayout} />
    </main>
  );
}
