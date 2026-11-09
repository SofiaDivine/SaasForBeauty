"use client";

import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import {
  areaOf,
  feedAreas,
  feedCategories,
  type FeedArea,
  type FeedCategory,
  profileThreadHref,
  type FeedPost,
} from "@/lib/sample-feed";

export function VerticalFocusFeed({ posts }: { posts: FeedPost[] }) {
  const [categories, setCategories] = useState<FeedCategory[]>([]);
  const [areas, setAreas] = useState<FeedArea[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [tfpOnly, setTfpOnly] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const citiesInFeed = useMemo(() => {
    return [...new Set(posts.map((post) => post.location))].sort((a, b) =>
      a.localeCompare(b, "uk"),
    );
  }, [posts]);

  const visible = useMemo(
    () =>
      posts.filter((post) => {
        if (tfpOnly && post.type !== "TFP") return false;
        if (categories.length > 0 && !categories.includes(post.category)) return false;
        if (areas.length > 0 && !areas.includes(areaOf(post.category))) return false;
        if (cities.length > 0 && !cities.includes(post.location)) return false;
        return true;
      }),
    [posts, categories, areas, cities, tfpOnly],
  );

  const extraFilters = areas.length + cities.length;

  function toggleCategory(id: FeedCategory) {
    setCategories((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  }

  function toggleArea(id: FeedArea) {
    setAreas((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  }

  function toggleCity(city: string) {
    setCities((current) =>
      current.includes(city) ? current.filter((item) => item !== city) : [...current, city],
    );
  }

  function resetExtraFilters() {
    setAreas([]);
    setCities([]);
  }

  return (
    <section className="space-y-4">
      <div className="space-y-3">
        <h2 className="text-sm font-semibold tracking-wide text-stone-500 uppercase">
          Оголошення
        </h2>
        <div className="flex items-start gap-2">
          <div role="group" aria-label="Категорії" className="flex flex-1 flex-wrap gap-2">
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
          <button
            type="button"
            aria-haspopup="dialog"
            aria-expanded={filtersOpen}
            onClick={() => setFiltersOpen(true)}
            className={`relative shrink-0 rounded-full border p-2 transition-transform active:scale-95 ${
              extraFilters > 0
                ? "border-stone-900 bg-stone-900 text-white"
                : "border-stone-200 bg-white text-stone-700"
            }`}
          >
            <FilterIcon />
            <span className="sr-only">Фільтри</span>
            {extraFilters > 0 ? (
              <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-white px-1 text-[10px] font-semibold text-stone-900">
                {extraFilters}
              </span>
            ) : null}
          </button>
        </div>
      </div>

      {filtersOpen ? (
        <FilterDialog
          areas={areas}
          cities={cities}
          cityOptions={citiesInFeed}
          onToggleArea={toggleArea}
          onToggleCity={toggleCity}
          onReset={resetExtraFilters}
          onClose={() => setFiltersOpen(false)}
        />
      ) : null}

      {visible.length === 0 ? (
        <p className="text-sm text-stone-600">Немає оголошень за цими фільтрами.</p>
      ) : (
        <ol className="space-y-4">
          {visible.map((post) => (
            <li key={post.id}>
              <Link
                href={profileThreadHref(post.masterId, post.id)}
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

function FilterDialog({
  areas,
  cities,
  cityOptions,
  onToggleArea,
  onToggleCity,
  onReset,
  onClose,
}: {
  areas: FeedArea[];
  cities: string[];
  cityOptions: string[];
  onToggleArea: (id: FeedArea) => void;
  onToggleCity: (city: string) => void;
  onReset: () => void;
  onClose: () => void;
}) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const previous = document.activeElement;
    dialogRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onCloseRef.current();
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      if (previous instanceof HTMLElement) previous.focus();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
      <button
        type="button"
        aria-label="Закрити фільтри"
        className="absolute inset-0 bg-stone-950/40"
        onClick={onClose}
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="relative flex max-h-[min(36rem,calc(100%-1rem))] w-full max-w-md flex-col rounded-3xl bg-white p-5 shadow-xl outline-none"
      >
        <div className="flex items-start justify-between gap-3">
          <h3 id={titleId} className="text-lg font-semibold tracking-tight">
            Фільтри
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-2 py-1 text-sm text-stone-500 hover:text-stone-900"
          >
            Закрити
          </button>
        </div>

        <div className="mt-4 min-h-0 flex-1 overflow-y-auto">
        <fieldset className="space-y-1">
          <legend className="text-sm font-medium text-stone-900">Напрям</legend>
          {feedAreas.map((area) => {
            const selected = areas.includes(area.id);
            return (
              <label
                key={area.id}
                className={`flex cursor-pointer items-start gap-3 rounded-2xl px-2 py-2 ${
                  selected ? "bg-stone-100" : ""
                }`}
              >
                <input
                  type="checkbox"
                  className="mt-0.5 accent-stone-900"
                  checked={selected}
                  onChange={() => onToggleArea(area.id)}
                />
                <span>
                  <span className="block text-sm font-medium">{area.label}</span>
                  <span className="block text-sm text-stone-500">{area.hint}</span>
                </span>
              </label>
            );
          })}
        </fieldset>

        <fieldset className="mt-5">
          <legend className="text-sm font-medium text-stone-900">Місто</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {cityOptions.map((city) => {
              const selected = cities.includes(city);
              return (
                <button
                  key={city}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => onToggleCity(city)}
                  className={`rounded-full px-3 py-1 text-sm ${
                    selected ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-700"
                  }`}
                >
                  {city}
                </button>
              );
            })}
          </div>
        </fieldset>
        </div>

        <div className="mt-5 flex gap-2">
          <button
            type="button"
            onClick={onReset}
            className="flex-1 rounded-full border border-stone-200 px-4 py-2 text-sm"
          >
            Скинути
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-full bg-stone-900 px-4 py-2 text-sm text-white"
          >
            Показати
          </button>
        </div>
      </div>
    </div>
  );
}

function FilterIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 6h16M4 12h10M4 18h6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="16" cy="12" r="2.2" fill="currentColor" />
      <circle cx="12" cy="18" r="2.2" fill="currentColor" />
    </svg>
  );
}
