import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { loadFeedPosts } from "@/lib/load-catalog";
import { postBookingHref, profileThreadHref } from "@/lib/sample-feed";

export const metadata: Metadata = {
  title: "TFP · TFP-Bundle",
};

export default function TfpFeedPage() {
  return (
    <Suspense fallback={<p className="px-4 py-8 text-sm text-stone-600">Завантажуємо TFP…</p>}>
      <TfpContent />
    </Suspense>
  );
}

async function TfpContent() {
  const posts = (await loadFeedPosts()).filter((post) => post.type === "TFP");

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-4 py-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">TFP</h1>
        <p className="text-stone-600">
          Окремі пропозиції співпраці: модель і майстер обмінюються часом, без оплати послуги.
        </p>
      </header>
      <ol className="space-y-4">
        {posts.map((post) => (
          <li key={post.id}>
            <article className="rounded-3xl border border-stone-200 bg-white p-5">
              <p className="text-xs text-stone-500">
                {post.location} · {post.masterName}
              </p>
              <h2 className="mt-2 text-xl font-semibold tracking-tight">{post.title}</h2>
              <p className="mt-2 text-stone-700">{post.content}</p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <Link
                  href={postBookingHref(post.masterId, post.id)}
                  className="rounded-full bg-stone-900 px-4 py-2 text-sm text-white"
                >
                  Записатися
                </Link>
                <Link
                  href={profileThreadHref(post.masterId, post.id)}
                  className="text-sm font-medium underline-offset-4 hover:underline"
                >
                  Відкрити у стрічці
                </Link>
              </div>
            </article>
          </li>
        ))}
      </ol>
    </main>
  );
}
