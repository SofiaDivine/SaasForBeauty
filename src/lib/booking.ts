import { addMinutes, format, isBefore, set, startOfDay } from "date-fns";

export const SALON_OPEN_MINUTES = 9 * 60;
export const SALON_CLOSE_MINUTES = 18 * 60;
export const SALON_TIME_ZONE = "Europe/Kyiv";

export const TFP_TIME_NOTE =
  "Вкажіть бажаний час і дату — власник зв’яжеться з вами для уточнення.";

export const TFP_VISIT_NOTE = "Бажаний час. Власник зв’яжеться з вами для уточнення.";

export type ServiceNotice = {
  postId: string;
  type: "TFP" | "PROMO" | "GIVEAWAY" | "NEW_ITEM";
  title: string;
  content: string;
};

export type BookingService = {
  id: string;
  title: string;
  durationMinutes: number;
  price: string;
  isTfp: boolean;
  notices: ServiceNotice[];
};

export type BookingActionState = {
  error?: string;
  bookingId?: string;
} | null;

export function buildTimeSlots(day: Date, durationMinutes: number): Date[] {
  if (!Number.isInteger(durationMinutes) || durationMinutes <= 0) return [];

  const open = set(startOfDay(day), { hours: 9, minutes: 0, seconds: 0, milliseconds: 0 });
  const close = set(startOfDay(day), { hours: 18, minutes: 0, seconds: 0, milliseconds: 0 });
  const slots: Date[] = [];

  for (
    let cursor = open;
    !isBefore(close, addMinutes(cursor, durationMinutes));
    cursor = addMinutes(cursor, durationMinutes)
  ) {
    slots.push(cursor);
  }

  return slots;
}

export function formatSlot(slot: Date) {
  return format(slot, "HH:mm");
}

export function formatKyivVisit(instant: Date) {
  return new Intl.DateTimeFormat("uk-UA", {
    timeZone: SALON_TIME_ZONE,
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(instant);
}

export function isValidSlotTime(time: string, durationMinutes: number) {
  const anchor = new Date(2026, 0, 1);
  return buildTimeSlots(anchor, durationMinutes).some((slot) => formatSlot(slot) === time);
}

export function isPaidService(service: Pick<BookingService, "price" | "isTfp">) {
  if (service.isTfp) return false;
  const amount = Number(service.price);
  return Number.isFinite(amount) && amount > 0;
}

export function formatServicePrice(service: Pick<BookingService, "price" | "isTfp">) {
  if (service.isTfp) return "TFP / Безкоштовно";

  const amount = Number(service.price);
  if (!Number.isFinite(amount)) return service.price;

  const [whole, fraction] = amount.toFixed(2).split(".");
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0");
  const digits = fraction === "00" ? grouped : `${grouped},${fraction}`;
  return `${digits} грн`;
}

type WallClock = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
};

function wallClock(instant: Date, timeZone: string): WallClock {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(instant);

  const value = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((part) => part.type === type)?.value);

  return {
    year: value("year"),
    month: value("month"),
    day: value("day"),
    hour: value("hour"),
    minute: value("minute"),
  };
}

function offsetMinutes(instant: Date, timeZone: string) {
  const clock = wallClock(instant, timeZone);
  const asUtc = Date.UTC(clock.year, clock.month - 1, clock.day, clock.hour, clock.minute);
  return Math.round((asUtc - instant.getTime()) / 60_000);
}

export function kyivDateTime(date: string, time: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  const timeMatch = /^(\d{2}):(\d{2})$/.exec(time);
  if (!match || !timeMatch) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const hour = Number(timeMatch[1]);
  const minute = Number(timeMatch[2]);
  if (month < 1 || month > 12 || day < 1 || day > 31 || hour > 23 || minute > 59) {
    return null;
  }

  const utcGuess = new Date(Date.UTC(year, month - 1, day, hour, minute));
  const firstOffset = offsetMinutes(utcGuess, SALON_TIME_ZONE);
  let result = new Date(utcGuess.getTime() - firstOffset * 60_000);
  const secondOffset = offsetMinutes(result, SALON_TIME_ZONE);
  if (secondOffset !== firstOffset) {
    result = new Date(utcGuess.getTime() - secondOffset * 60_000);
  }

  const clock = wallClock(result, SALON_TIME_ZONE);
  if (
    clock.year !== year ||
    clock.month !== month ||
    clock.day !== day ||
    clock.hour !== hour ||
    clock.minute !== minute
  ) {
    return null;
  }

  return result;
}
