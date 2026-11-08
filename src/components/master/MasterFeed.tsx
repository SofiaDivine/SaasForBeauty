"use client";

import type { GridLayout, PostType } from "@prisma/client";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

export type MasterFeedPost = {
  id: string;
  type: PostType;
  title: string;
  content: string | null;
  mediaUrls: string[];
  masterId: string;
  masterName: string;
  masterAvatarUrl: string | null;
};

const postTypeLabel: Record<PostType, string> = {
  TFP: "TFP",
  PROMO: "Акція",
  GIVEAWAY: "Розіграш",
  NEW_ITEM: "Новинка",
};

const postTypeBadge: Record<PostType, string> = {
  TFP: "bg-stone-900 text-white",
  PROMO: "bg-amber-100 text-amber-950",
  GIVEAWAY: "bg-rose-100 text-rose-950",
  NEW_ITEM: "bg-emerald-100 text-emerald-950",
};

function isVideoUrl(url: string) {
  const path = url.split(/[?#]/)[0] ?? url;
  return /\.(mp4|webm|mov|m4v|ogv)$/i.test(path);
}

function initials(name: string) {
  const letters = name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
  return letters || "М";
}

function MediaTile({
  url,
  alt,
  fallback,
  controls,
}: {
  url?: string;
  alt: string;
  fallback?: string;
  controls: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const caption = fallback || alt;

  if (!url || failed) {
    return (
      <div className="flex h-full w-full items-end bg-gradient-to-br from-stone-200 to-stone-400 p-3">
        {caption ? (
          <span className="line-clamp-3 text-left text-sm font-medium text-stone-900">{caption}</span>
        ) : null}
      </div>
    );
  }

  if (isVideoUrl(url)) {
    return (
      <video
        className="h-full w-full bg-stone-900 object-cover"
        src={url}
        controls={controls}
        muted={!controls}
        playsInline
        preload="metadata"
        aria-label={alt || undefined}
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <img
      src={url}
      alt={alt}
      className="h-full w-full object-cover"
      onError={() => setFailed(true)}
    />
  );
}

function MediaCarousel({
  urls,
  label,
  variant,
}: {
  urls: string[];
  label: string;
  variant: "strip" | "stage";
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const stage = variant === "stage";

  function syncActive(node: HTMLDivElement) {
    const children = [...node.children] as HTMLElement[];
    let nearest = 0;
    let distance = Number.POSITIVE_INFINITY;
    children.forEach((child, index) => {
      const delta = Math.abs(child.offsetLeft - node.scrollLeft);
      if (delta < distance) {
        distance = delta;
        nearest = index;
      }
    });
    setActive(nearest);
  }

  function scrollToIndex(index: number) {
    const node = scrollerRef.current;
    const child = node?.children.item(index) as HTMLElement | null;
    if (!node || !child) return;
    node.scrollTo({ left: child.offsetLeft, behavior: "smooth" });
  }

  if (urls.length === 0) {
    return (
      <div className="aspect-square overflow-hidden bg-stone-200">
        <MediaTile alt={label} controls={false} />
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        onScroll={(event) => syncActive(event.currentTarget)}
        className={`flex snap-x snap-mandatory overflow-x-auto ${stage ? "" : "gap-2"}`}
        aria-roledescription="карусель"
        aria-label={label}
      >
        {urls.map((url, index) => (
          <div
            key={`${url}-${index}`}
            className={`shrink-0 snap-start overflow-hidden bg-stone-200 ${
              stage
                ? "aspect-square w-full"
                : urls.length === 1
                  ? "aspect-[4/5] w-full rounded-2xl"
                  : "aspect-[4/5] w-[78%] rounded-2xl"
            }`}
          >
            <MediaTile
              url={url}
              alt={
                urls.length > 1
                  ? `${label}, медіа ${index + 1} з ${urls.length}`
                  : label
              }
              controls={isVideoUrl(url)}
            />
          </div>
        ))}
      </div>
      {urls.length > 1 ? (
        <div className="mt-2 flex items-center justify-center gap-1.5">
          {stage ? (
            <button
              type="button"
              className="mr-1 rounded-full px-2 py-1 text-sm text-stone-700 disabled:opacity-30"
              onClick={() => scrollToIndex(active - 1)}
              disabled={active === 0}
            >
              Назад
            </button>
          ) : null}
          {urls.map((url, index) => (
            <button
              key={`${url}-dot-${index}`}
              type="button"
              aria-label={`Медіа ${index + 1} з ${urls.length}`}
              aria-current={index === active ? "true" : undefined}
              className={`h-1.5 rounded-full ${index === active ? "w-4 bg-stone-900" : "w-1.5 bg-stone-300"}`}
              onClick={() => scrollToIndex(index)}
            />
          ))}
          {stage ? (
            <button
              type="button"
              className="ml-1 rounded-full px-2 py-1 text-sm text-stone-700 disabled:opacity-30"
              onClick={() => scrollToIndex(active + 1)}
              disabled={active === urls.length - 1}
            >
              Далі
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function Avatar({ name, url }: { name: string; url: string | null }) {
  const [failed, setFailed] = useState(false);

  if (url && !failed) {
    return (
      <img
        src={url}
        alt=""
        className="h-10 w-10 rounded-full object-cover"
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <span
      aria-hidden
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-stone-200 text-xs font-semibold text-stone-800"
    >
      {initials(name)}
    </span>
  );
}

function TypeBadge({ type }: { type: PostType }) {
  return (
    <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${postTypeBadge[type]}`}>
      {postTypeLabel[type]}
    </span>
  );
}

function PostModal({ post, onClose }: { post: MasterFeedPost; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const description = post.content?.trim() ?? "";

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    dialog.showModal();
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      className="m-auto w-[min(calc(100%-2rem),920px)] max-h-[calc(100%-2rem)] overflow-y-auto rounded-3xl border-0 bg-white p-0 text-stone-900 shadow-xl backdrop:bg-stone-950/70"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}
    >
      <div className="grid sm:grid-cols-[minmax(0,1.15fr)_minmax(16rem,0.85fr)]">
        <div className="bg-stone-100">
          <MediaCarousel urls={post.mediaUrls} label={post.title} variant="stage" />
        </div>
        <div className="flex flex-col gap-4 p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-2">
              <TypeBadge type={post.type} />
              <h2 id={titleId} className="text-xl font-semibold tracking-tight">
                {post.title}
              </h2>
            </div>
            <button
              type="button"
              className="rounded-full px-2 py-1 text-sm text-stone-500 hover:bg-stone-100 hover:text-stone-900"
              onClick={() => dialogRef.current?.close()}
            >
              Закрити
            </button>
          </div>
          {description ? <p className="text-stone-700">{description}</p> : null}
          <Link
            href={`/master/${post.masterId}/book`}
            className="mt-auto inline-flex w-fit rounded-full bg-stone-900 px-4 py-2 text-sm text-white"
          >
            Записатися
          </Link>
        </div>
      </div>
    </dialog>
  );
}

function InstagramGrid({
  posts,
  onOpen,
}: {
  posts: MasterFeedPost[];
  onOpen: (post: MasterFeedPost) => void;
}) {
  return (
    <ul className="grid grid-cols-3 gap-0.5 sm:gap-1">
      {posts.map((post) => {
        const cover = post.mediaUrls[0];
        const stacked = post.mediaUrls.length > 1;
        return (
          <li key={post.id}>
            <button
              type="button"
              onClick={() => onOpen(post)}
              aria-label={`Відкрити пост: ${post.title}`}
              className="relative block aspect-square w-full overflow-hidden bg-stone-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900"
            >
              <span className="pointer-events-none absolute inset-0">
                <MediaTile url={cover} alt="" fallback={post.title} controls={false} />
              </span>
              {stacked ? (
                <span className="absolute top-1.5 right-1.5 text-white drop-shadow" aria-hidden>
                  <svg viewBox="0 0 24 24" className="h-5 w-5">
                    <path fill="currentColor" d="M7 3h13v13h-2V5H7V3z" />
                    <path fill="currentColor" d="M4 7h13v13H4V7z" opacity="0.85" />
                  </svg>
                </span>
              ) : null}
              {cover && isVideoUrl(cover) ? (
                <span
                  className="absolute bottom-1.5 left-1.5 rounded-full bg-stone-950/70 px-1.5 py-0.5 text-[10px] font-medium text-white"
                  aria-hidden
                >
                  Відео
                </span>
              ) : null}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function ThreadsFeed({
  posts,
  savedIds,
  onToggleSave,
}: {
  posts: MasterFeedPost[];
  savedIds: string[];
  onToggleSave: (id: string) => void;
}) {
  return (
    <ol className="mx-auto w-full max-w-xl space-y-4">
      {posts.map((post) => {
        const saved = savedIds.includes(post.id);
        const text = post.content?.trim() || post.title;
        return (
          <li key={post.id}>
            <article className="flex gap-3 rounded-3xl border border-stone-200 bg-white p-4">
              <Avatar name={post.masterName} url={post.masterAvatarUrl} />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <p className="truncate font-semibold">{post.masterName}</p>
                  <TypeBadge type={post.type} />
                </div>
                {post.content?.trim() ? (
                  <p className="mt-1 text-sm font-medium text-stone-900">{post.title}</p>
                ) : null}
                <p className="mt-1 whitespace-pre-wrap text-stone-800">{text}</p>
                {post.mediaUrls.length > 0 ? (
                  <div className="mt-3">
                    <MediaCarousel urls={post.mediaUrls} label={post.title} variant="strip" />
                  </div>
                ) : null}
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    aria-pressed={saved}
                    onClick={() => onToggleSave(post.id)}
                    className={`rounded-full border px-4 py-2 text-sm ${
                      saved
                        ? "border-stone-900 bg-stone-100 text-stone-900"
                        : "border-stone-300 bg-white text-stone-800"
                    }`}
                  >
                    {saved ? "Збережено" : "Зберегти"}
                  </button>
                  <Link
                    href={`/master/${post.masterId}/book`}
                    className="rounded-full bg-stone-900 px-4 py-2 text-sm text-white"
                  >
                    Записатися
                  </Link>
                </div>
              </div>
            </article>
          </li>
        );
      })}
    </ol>
  );
}

export function MasterFeed({
  posts,
  gridLayout,
}: {
  posts: MasterFeedPost[];
  gridLayout: GridLayout;
}) {
  const [active, setActive] = useState<MasterFeedPost | null>(null);
  const [savedIds, setSavedIds] = useState<string[]>([]);

  function toggleSave(id: string) {
    setSavedIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  }

  if (posts.length === 0) {
    return <p className="text-sm text-stone-600">У майстра ще немає постів.</p>;
  }

  return (
    <section aria-label="Публікації майстра">
      {gridLayout === "INSTAGRAM_GRID" ? (
        <InstagramGrid posts={posts} onOpen={setActive} />
      ) : (
        <ThreadsFeed posts={posts} savedIds={savedIds} onToggleSave={toggleSave} />
      )}
      {active ? <PostModal key={active.id} post={active} onClose={() => setActive(null)} /> : null}
    </section>
  );
}
