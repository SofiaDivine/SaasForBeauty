"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { feedCategories, type FeedCategory, type FeedPost } from "@/lib/sample-feed";

export function VerticalFocusFeed({ posts }: { posts: FeedPost[] }) {
  const [categories, setCategories] = useState<FeedCategory[]>([]);
  const [tfpOnly, setTfpOnly] = useState(false);

  const visible = useMemo(
    () =>
      posts.filter((post) => {
        if (tfpOnly && post.type !== "TFP") return false;
        if (categories.length > 0 && !categories.includes(post.category)) return false;
        return true;
      }),
    [posts, categories, tfpOnly],
  );

  function toggleCategory(id: FeedCategory) {
    setCategories((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  }

  return (
    <section className="space-y-4">
      <div className="space-y-3">
        <h2 className="text-sm font-semibold tracking-wide text-stone-500 uppercase">
          Оголошення
        </h2>
        <div role="group" aria-label="Категорії" className="flex flex-wrap gap-2">
          {feedCategories.map((category) => {
            const selected = categories.includes(category.id);
            return (
              <button
                key={category.id}
                type="button"
                aria-pressed={selected}
                onClick={() => toggleCategory(category.id)}
                className={`rounded-full px-3 py-1 text-sm transition-transform active:scale-95 ${
                  selected ? "bg-stone-900 text-white" : "bg-white text-stone-700"
                }`}
              >
                {category.label}
              </button>
            );
          })}
          <button
            type="button"
            aria-pressed={tfpOnly}
            onClick={() => setTfpOnly((current) => !current)}
            className={`rounded-full px-3 py-1 text-sm transition-transform active:scale-95 ${
              tfpOnly ? "bg-stone-900 text-white" : "bg-white text-stone-700"
            }`}
          >
            TFP лише
          </button>
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="text-sm text-stone-600">Немає оголошень за цими фільтрами.</p>
      ) : (
        <ol className="space-y-4">
          {visible.map((post) => (
            <li key={post.id}>
              <Link
                href={`/master/${post.masterId}`}
                className="block rounded-3xl border border-stone-200 bg-white p-5 transition-transform duration-150 ease-out active:scale-[0.985]"
              >
                <p className="text-xs text-stone-500">
                  {post.type} · {post.location}
                </p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight">{post.title}</h3>
                <p className="mt-2 max-w-prose text-stone-700">{post.content}</p>
                <p className="mt-4 text-sm font-medium">{post.masterName}</p>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
