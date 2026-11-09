import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { BookingCalendar } from "@/components/booking/BookingCalendar";
import { loadMaster } from "@/lib/load-catalog";

export const metadata: Metadata = {
  title: "Запис · TFP-Bundle",
};

async function loadServices(masterProfileId: string) {
  const master = await loadMaster(masterProfileId);
  return master?.services ?? [];
}

export default function MasterBookingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<p className="px-4 py-8 text-sm text-stone-600">Завантажуємо календар…</p>}>
      <BookingContent params={params} />
    </Suspense>
  );
}

async function BookingContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const services = await loadServices(id);

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-4 py-8">
      <header className="space-y-2">
        <Link
          href={`/master/${id}`}
          className="text-sm text-stone-600 underline-offset-4 hover:underline"
        >
          До профілю
        </Link>
        <h1 className="text-3xl font-semibold tracking-tight">Запис</h1>
        <p className="text-stone-600">
          Оберіть послугу, день і годину. Робочий час салону — 09:00–18:00.
        </p>
      </header>
      <BookingCalendar masterProfileId={id} services={services} />
    </main>
  );
}
