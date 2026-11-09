"use client";

import Link from "next/link";
import { useRef, type PointerEvent as ReactPointerEvent, type MouseEvent as ReactMouseEvent } from "react";
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
  const scrollerRef = useRef<HTMLUListElement>(null);
  const drag = useRef({
    active: false,
    startX: 0,
    scrollLeft: 0,
    moved: false,
  });

  function onPointerDown(event: ReactPointerEvent<HTMLUListElement>) {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    const node = scrollerRef.current;
    if (!node) return;
    drag.current = {
      active: true,
      startX: event.clientX,
      scrollLeft: node.scrollLeft,
      moved: false,
    };
  }

  function onPointerMove(event: ReactPointerEvent<HTMLUListElement>) {
    const node = scrollerRef.current;
    if (!node || !drag.current.active) return;
    const delta = event.clientX - drag.current.startX;
    if (!drag.current.moved) {
      if (Math.abs(delta) < 8) return;
      drag.current.moved = true;
      node.setPointerCapture(event.pointerId);
    }
    node.scrollLeft = drag.current.scrollLeft - delta;
  }

  function endDrag(event: ReactPointerEvent<HTMLUListElement>) {
    if (!drag.current.active) return;
    drag.current.active = false;
    if (scrollerRef.current?.hasPointerCapture(event.pointerId)) {
      scrollerRef.current.releasePointerCapture(event.pointerId);
    }
  }

  function onClickCapture(event: ReactMouseEvent<HTMLUListElement>) {
    if (!drag.current.moved) return;
    event.preventDefault();
    event.stopPropagation();
    drag.current.moved = false;
  }

  return (
    <section className="space-y-3">
      <div className="flex items-baseline justify-between">
        <h2 className="text-sm font-semibold tracking-wide text-stone-500 uppercase">
          {title}
        </h2>
        {href ? (
          <Link href={href} className="text-sm text-stone-700 underline-offset-4 hover:underline">
            Усі
          </Link>
        ) : null}
      </div>
      <ul
        ref={scrollerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
        className="flex cursor-grab touch-pan-x gap-3 overflow-x-auto overflow-y-hidden [-ms-overflow-style:none] [scrollbar-width:none] active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
      >
        {posts.map((post) => (
          <li key={post.id} className="w-64 shrink-0">
            <Link
              href={`/master/${post.masterId}/book`}
              draggable={false}
              className="flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white"
            >
              <CardMedia post={post} />
              <div className="p-4">
                <p className="text-xs text-stone-500">{post.masterName}</p>
                <p className="mt-2 font-medium leading-snug">{post.title}</p>
                <p className="mt-2 line-clamp-2 text-sm text-stone-600">{post.content}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function CardMedia({ post }: { post: FeedPost }) {
  if (!post.mediaUrl || !post.mediaKind) return null;

  if (post.mediaKind === "video") {
    return (
      <div className="relative aspect-[4/3] bg-stone-200">
        <video
          src={post.mediaUrl}
          className="pointer-events-none h-full w-full object-cover"
          muted
          playsInline
          autoPlay
          loop
          preload="metadata"
          aria-hidden
        />
        <span className="absolute bottom-2 left-2 rounded-full bg-stone-950/70 px-2 py-0.5 text-[10px] font-medium text-white">
          Відео
        </span>
      </div>
    );
  }

  return (
    <img
      src={post.mediaUrl}
      alt={post.title}
      draggable={false}
      className="aspect-[4/3] w-full object-cover"
    />
  );
}
