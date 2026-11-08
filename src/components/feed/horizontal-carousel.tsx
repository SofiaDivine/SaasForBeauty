import Link from "next/link";
import type { FeedPost } from "@/lib/sample-feed";

export function HorizontalCarousel({
  title,
  href,
  posts,
}: {
  title: string;
  href: string | null;
  posts: FeedPost[];
}) {
  return (
    <section className="space-y-3">
      <div className="flex items-baseline justify-between">
        <h2 className="text-sm font-semibold tracking-wide uppercase text-stone-500">
          {title}
        </h2>
        {href ? (
          <Link href={href} className="text-sm text-stone-700 underline-offset-4 hover:underline">
            Усі
          </Link>
        ) : null}
      </div>
      <ul className="flex snap-x gap-3 overflow-x-auto pb-1">
        {posts.map((post) => (
          <li key={post.id} className="w-60 shrink-0 snap-start">
            <Link
              href={`/master/${post.masterId}`}
              className="block h-full rounded-2xl border border-stone-200 bg-white p-4"
            >
              <p className="text-xs text-stone-500">{post.masterName}</p>
              <p className="mt-2 font-medium leading-snug">{post.title}</p>
              <p className="mt-2 line-clamp-2 text-sm text-stone-600">{post.content}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
