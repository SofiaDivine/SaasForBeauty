"use client";

import { useEffect, useState, useTransition } from "react";
import { toggleBookmark } from "@/server/bookmarks";

export function SavePostButton({ postId, saved }: { postId: string; saved: boolean }) {
  const [isSaved, setIsSaved] = useState(saved);
  const [message, setMessage] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    setIsSaved(saved);
  }, [postId, saved]);

  function onClick() {
    const next = !isSaved;
    setMessage(null);
    setIsSaved(next);
    startTransition(async () => {
      const result = await toggleBookmark(postId, window.location.pathname + window.location.search);
      if (!result.ok) {
        setIsSaved(!next);
        setMessage(result.message ?? "Не вдалося зберегти пост.");
        return;
      }
      setIsSaved(result.saved ?? next);
    });
  }

  return (
    <span className="inline-flex flex-col items-start gap-1">
      <button
        type="button"
        aria-pressed={isSaved}
        disabled={pending}
        onClick={onClick}
        className={`rounded-full border px-4 py-2 text-sm disabled:opacity-70 ${
          isSaved
            ? "border-stone-900 bg-stone-100 text-stone-900"
            : "border-stone-300 bg-white text-stone-800"
        }`}
      >
        {pending ? "Зберігаємо…" : isSaved ? "Збережено" : "Зберегти"}
      </button>
      {message ? <span className="text-xs text-red-700">{message}</span> : null}
    </span>
  );
}
