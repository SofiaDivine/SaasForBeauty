import type { Metadata } from "next";
import Link from "next/link";
import { BookingCalendar } from "@/components/booking/booking-calendar";

export const metadata: Metadata = {
  title: "Запис · BeautySaaS",
};

const services = [
  { id: "cut", title: "Стрижка", duration: "60 хв", price: "900 грн" },
  { id: "color", title: "Фарбування", duration: "150 хв", price: "2 400 грн" },
  { id: "tfp", title: "TFP-зйомка", duration: "120 хв", price: "Без оплати" },
];

export default async function MasterBookingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

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
        <p className="text-stone-600">Оберіть день, час і послугу майстра.</p>
      </header>
      <BookingCalendar />
      <section className="space-y-3">
        <h2 className="text-sm font-semibold tracking-wide uppercase text-stone-500">
          Послуги
        </h2>
        <ul className="grid gap-3 sm:grid-cols-3">
          {services.map((service) => (
            <li key={service.id} className="rounded-2xl border border-stone-200 bg-white p-4">
              <p className="font-medium">{service.title}</p>
              <p className="mt-1 text-sm text-stone-600">
                {service.duration} · {service.price}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
