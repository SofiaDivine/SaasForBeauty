"use client";

import { format, isBefore, startOfDay } from "date-fns";
import { uk } from "date-fns/locale";
import { useActionState, useEffect, useMemo, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  buildTimeSlots,
  formatServicePrice,
  formatSlot,
  type BookingService,
} from "@/lib/booking";
import { createBooking } from "@/server/create-booking";

export function BookingCalendar({
  masterProfileId,
  services,
  initialServiceId,
}: {
  masterProfileId: string;
  services: BookingService[];
  initialServiceId?: string;
}) {
  const [date, setDate] = useState<Date | undefined>();
  const [serviceId, setServiceId] = useState(initialServiceId ?? "");
  const [time, setTime] = useState("");
  const [now, setNow] = useState<Date | null>(null);
  const [state, submitBooking, pending] = useActionState(createBooking, null);

  useEffect(() => {
    setNow(new Date());
  }, []);

  const service = services.find((item) => item.id === serviceId);
  const notice = service?.notices[0];
  const slots = useMemo(() => {
    if (!date || !service || !now) return [];
    return buildTimeSlots(date, service.durationMinutes).filter(
      (slot) => !isBefore(slot, now),
    );
  }, [date, service, now]);
  const hasWindow =
    date && service ? buildTimeSlots(date, service.durationMinutes).length > 0 : false;

  const dateValue = date ? format(date, "yyyy-MM-dd") : "";
  const ready = Boolean(service && dateValue && time);

  return (
    <div className="grid gap-8 lg:grid-cols-[auto_minmax(0,1fr)]">
      <section className="rounded-3xl border border-stone-200 bg-white p-4">
        <h2 className="mb-3 text-sm font-semibold tracking-wide text-stone-500 uppercase">
          Дата
        </h2>
        {now ? (
          <Calendar
            mode="single"
            selected={date}
            onSelect={(next) => {
              setDate(next);
              setTime("");
            }}
            disabled={{ before: startOfDay(now) }}
          />
        ) : (
          <div className="h-80" />
        )}
      </section>

      <form action={submitBooking} className="space-y-6">
        <input type="hidden" name="masterProfileId" value={masterProfileId} />
        <input type="hidden" name="date" value={dateValue} />

        <fieldset className="space-y-3">
          <legend className="text-sm font-semibold tracking-wide text-stone-500 uppercase">
            Послуга
          </legend>
          {services.length === 0 ? (
            <p className="text-sm text-stone-600">У цього майстра ще немає послуг для запису.</p>
          ) : (
            <ul className="grid gap-3 sm:grid-cols-2">
              {services.map((item) => {
                const selected = item.id === serviceId;
                return (
                  <li key={item.id}>
                    <label
                      className={`block cursor-pointer rounded-2xl border p-4 ${
                        selected
                          ? "border-stone-900 bg-stone-900 text-white"
                          : "border-stone-200 bg-white"
                      }`}
                    >
                      <input
                        type="radio"
                        name="serviceId"
                        value={item.id}
                        checked={selected}
                        onChange={() => {
                          setServiceId(item.id);
                          setTime("");
                        }}
                        className="sr-only"
                      />
                      <span className="block font-medium">{item.title}</span>
                      <span className={`mt-1 block text-sm ${selected ? "text-stone-200" : "text-stone-600"}`}>
                        {item.durationMinutes} хв · {formatServicePrice(item)}
                      </span>
                      {selected && notice ? (
                        <span className={`mt-3 block border-t pt-3 text-sm ${selected ? "border-white/20 text-stone-100" : "border-stone-200 text-stone-700"}`}>
                          <span className="block font-medium">{notice.title}</span>
                          <span className="mt-1 block font-normal">{notice.content}</span>
                        </span>
                      ) : null}
                    </label>
                  </li>
                );
              })}
            </ul>
          )}
        </fieldset>

        <fieldset className="space-y-3">
          <legend className="text-sm font-semibold tracking-wide text-stone-500 uppercase">
            Година
          </legend>
          {!service || !date ? (
            <p className="text-sm text-stone-600">Оберіть послугу й день, щоб побачити години.</p>
          ) : slots.length === 0 ? (
            <p className="text-sm text-stone-600">
              {hasWindow
                ? "На цей день вільних годин уже немає."
                : "Тривалість послуги не вміщується у робочий день 09:00–18:00."}
            </p>
          ) : (
            <ul className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {slots.map((slot) => {
                const label = formatSlot(slot);
                const selected = label === time;
                return (
                  <li key={label}>
                    <label
                      className={`block cursor-pointer rounded-2xl border px-3 py-2 text-center text-sm ${
                        selected
                          ? "border-stone-900 bg-stone-900 text-white"
                          : "border-stone-200 bg-white"
                      }`}
                    >
                      <input
                        type="radio"
                        name="time"
                        value={label}
                        checked={selected}
                        onChange={() => setTime(label)}
                        className="sr-only"
                      />
                      {label}
                    </label>
                  </li>
                );
              })}
            </ul>
          )}
        </fieldset>

        <section className="space-y-3 rounded-3xl border border-stone-200 bg-white p-4">
          <h2 className="text-sm font-semibold tracking-wide text-stone-500 uppercase">
            Підтвердження
          </h2>
          {service && date && time ? (
            <p className="text-stone-800">
              {service.title} · {format(date, "d MMMM yyyy", { locale: uk })} · {time} ·{" "}
              {formatServicePrice(service)}
            </p>
          ) : (
            <p className="text-sm text-stone-600">Оберіть послугу, день і годину.</p>
          )}
          <button
            type="submit"
            disabled={!ready || pending}
            className="rounded-full bg-stone-900 px-4 py-2 text-sm text-white disabled:opacity-40"
          >
            {pending ? "Зберігаємо…" : "Підтвердити запис"}
          </button>
          {state?.error ? (
            <p role="alert" className="text-sm text-red-700">
              {state.error}
            </p>
          ) : null}
          {state?.bookingId ? (
            <p role="status" className="text-sm text-stone-700">
              Запис створено й очікує підтвердження.
            </p>
          ) : null}
        </section>
      </form>
    </div>
  );
}
