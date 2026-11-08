"use client";

import { DayPicker, type DayPickerProps } from "react-day-picker";
import { uk } from "react-day-picker/locale/uk";
import "react-day-picker/style.css";

export function Calendar({
  className,
  locale = uk,
  weekStartsOn = 1,
  showOutsideDays = true,
  ...props
}: DayPickerProps) {
  return (
    <DayPicker
      {...props}
      locale={locale}
      weekStartsOn={weekStartsOn}
      showOutsideDays={showOutsideDays}
      className={["booking-calendar", className].filter(Boolean).join(" ")}
    />
  );
}
