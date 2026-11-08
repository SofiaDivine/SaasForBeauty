import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { BookingCalendar } from "@/components/booking/BookingCalendar";
import type { BookingService } from "@/lib/booking";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Запис · TFP-Bundle",
};

const previewServices: BookingService[] = [
  {
    id: "00000000-0000-4000-8000-000000000101",
    title: "Стрижка",
    durationMinutes: 60,
    price: "900",
    isTfp: false,
  },
  {
    id: "00000000-0000-4000-8000-000000000102",
    title: "Фарбування",
    durationMinutes: 150,
    price: "2400",
    isTfp: false,
  },
  {
    id: "00000000-0000-4000-8000-000000000103",
    title: "TFP-зйомка",
    durationMinutes: 120,
    price: "0",
    isTfp: true,
  },
];

function databaseIsRemote() {
  const url = process.env.DATABASE_URL ?? "";
  return url.length > 0 && !url.includes("localhost") && !url.includes("127.0.0.1");
}

async function loadServices(masterProfileId: string) {
  if (!databaseIsRemote()) return previewServices;

  const rows = await prisma.service.findMany({
    where: { masterProfileId },
    orderBy: { title: "asc" },
    select: {
      id: true,
      title: true,
      durationMinutes: true,
      price: true,
      isTfp: true,
    },
  });

  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    durationMinutes: row.durationMinutes,
    price: row.price.toString(),
    isTfp: row.isTfp,
  }));
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
