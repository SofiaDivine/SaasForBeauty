import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { MasterFeed, type MasterFeedPost } from "@/components/master/MasterFeed";
import { loadMaster } from "@/lib/load-catalog";
import { nicheLabel } from "@/lib/sample-feed";

export const metadata: Metadata = {
  title: "Профіль · TFP-Bundle",
};

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
  const master = await loadMaster(id);
  const gridLayout =
    view === "threads" ? "THREADS_FEED" : view === "grid" ? "INSTAGRAM_GRID" : (master?.gridLayout ?? "INSTAGRAM_GRID");
  const masterName = master?.name ?? "Майстер";
  const posts: MasterFeedPost[] = (master?.posts ?? []).map((post) => ({
    ...post,
    masterId: id,
    masterName,
    masterAvatarUrl: master?.avatarUrl || null,
  }));

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-4 py-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold tracking-tight">{masterName}</h1>
          <p className="text-sm text-stone-500">
            {master ? `${nicheLabel[master.niche]} · ${master.location}` : id}
          </p>
          {master?.bio ? <p className="max-w-xl text-sm text-stone-600">{master.bio}</p> : null}
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
