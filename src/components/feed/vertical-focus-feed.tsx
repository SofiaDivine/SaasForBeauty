"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { FeedPost } from "@/lib/sample-feed";

export function VerticalFocusFeed({ posts }: { posts: FeedPost[] }) {
  const [activeId, setActiveId] = useState(posts[0]?.id ?? "");
  const itemRefs = useRef(new Map<string, HTMLElement>());

  useEffect(() => {
    const nodes = [...itemRefs.current.entries()];
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const id = visible.target.getAttribute("data-post-id");
        if (id) setActiveId(id);
      },
      { root: null, threshold: [0.45, 0.7] },
    );

    for (const [, node] of nodes) observer.observe(node);
    return () => observer.disconnect();
  }, [posts]);

  return (
    <section className="space-y-3">
      <h2 className="text-sm font-semibold tracking-wide uppercase text-stone-500">
        У фокусі
      </h2>
      <ol className="space-y-4">
        {posts.map((post) => {
          const focused = post.id === activeId;
          return (
            <li key={post.id}>
              <article
                data-post-id={post.id}
                ref={(node) => {
                  if (node) itemRefs.current.set(post.id, node);
                  else itemRefs.current.delete(post.id);
                }}
                className={`rounded-3xl border bg-white p-5 transition ${
                  focused
                    ? "border-stone-900 shadow-sm"
                    : "border-stone-200 opacity-70"
                }`}
              >
                <p className="text-xs text-stone-500">
                  {post.type} · {post.location}
                </p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight">{post.title}</h3>
                <p className="mt-2 max-w-prose text-stone-700">{post.content}</p>
                <Link
                  href={`/master/${post.masterId}`}
                  className="mt-4 inline-block text-sm font-medium underline-offset-4 hover:underline"
                >
                  {post.masterName}
                </Link>
              </article>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
