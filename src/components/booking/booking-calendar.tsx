"use client";

import { useMemo, useState } from "react";

const weekdayLabels = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];
const slots = ["10:00", "12:00", "14:00", "16:30"];

function monthLabel(date: Date) {
  return new Intl.DateTimeFormat("uk-UA", {
    month: "long",
    year: "numeric",
  }).format(date);
}

function toDateKey(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

export function BookingCalendar() {
  const [cursor, setCursor] = useState(() => new Date());
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const cells = useMemo(() => {
    const year = cursor.getFullYear();
    const month = cursor.getMonth();
    const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const leading = Array.from({ length: firstWeekday }, () => null);
    const days = Array.from({ length: daysInMonth }, (_, index) => index + 1);
    return [...leading, ...days];
  }, [cursor]);

  return (
    <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_16rem]">
      <div className="rounded-3xl border border-stone-200 bg-white p-4">
        <div className="mb-4 flex items-center justify-between">
          <button
            type="button"
            className="rounded-full px-3 py-1 text-sm hover:bg-stone-100"
            onClick={() =>
              setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))
            }
          >
            Попередній
          </button>
          <p className="text-sm font-medium capitalize">{monthLabel(cursor)}</p>
          <button
            type="button"
            className="rounded-full px-3 py-1 text-sm hover:bg-stone-100"
            onClick={() =>
              setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))
            }
          >
            Наступний
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-xs text-stone-500">
          {weekdayLabels.map((label) => (
            <div key={label} className="py-2">
              {label}
            </div>
          ))}
          {cells.map((day, index) => {
            if (day === null) return <div key={`empty-${index}`} />;
            const key = toDateKey(new Date(cursor.getFullYear(), cursor.getMonth(), day));
            const selected = key === selectedDay;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedDay(key)}
                className={`rounded-xl py-2 text-sm ${
                  selected ? "bg-stone-900 text-white" : "hover:bg-stone-100"
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
      <div className="space-y-3">
        <p className="text-sm text-stone-500">
          {selectedDay ? `Дата ${selectedDay}` : "Оберіть день у календарі"}
        </p>
        <ul className="space-y-2">
          {slots.map((slot) => (
            <li key={slot}>
              <button
                type="button"
                disabled={!selectedDay}
                onClick={() => setSelectedSlot(slot)}
                className={`w-full rounded-2xl border px-3 py-2 text-left text-sm disabled:opacity-40 ${
                  selectedSlot === slot
                    ? "border-stone-900 bg-stone-900 text-white"
                    : "border-stone-200 bg-white"
                }`}
              >
                {slot}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
