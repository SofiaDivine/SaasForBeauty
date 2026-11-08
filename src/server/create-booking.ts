"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { UUID_RE } from "@/lib/api";
import { isValidSlotTime, kyivDateTime, type BookingActionState } from "@/lib/booking";
import { prisma } from "@/lib/prisma";

async function currentUserId(): Promise<string | null> {
  return null;
}

export async function createBooking(
  _previous: BookingActionState,
  formData: FormData,
): Promise<BookingActionState> {
  const masterProfileId = String(formData.get("masterProfileId") ?? "");
  const serviceId = String(formData.get("serviceId") ?? "");
  const date = String(formData.get("date") ?? "");
  const time = String(formData.get("time") ?? "");

  if (!UUID_RE.test(masterProfileId) || !UUID_RE.test(serviceId)) {
    return { error: "Оберіть послугу майстра." };
  }

  const dateTime = kyivDateTime(date, time);
  if (!dateTime) {
    return { error: "Оберіть день і годину." };
  }
  if (dateTime.getTime() <= Date.now()) {
    return { error: "Ця година вже минула." };
  }

  const userId = await currentUserId();
  if (!userId) {
    return { error: "Увійдіть, щоб підтвердити запис." };
  }

  try {
    const service = await prisma.service.findFirst({
      where: { id: serviceId, masterProfileId },
      select: { durationMinutes: true },
    });
    if (!service) {
      return { error: "Послуга не належить цьому профілю майстра." };
    }
    if (!isValidSlotTime(time, service.durationMinutes)) {
      return { error: "Ця година не входить у розклад послуги." };
    }

    const taken = await prisma.booking.findFirst({
      where: {
        masterProfileId,
        dateTime,
        status: { not: "CANCELLED" },
      },
      select: { id: true },
    });
    if (taken) {
      return { error: "Цей час уже зайнятий." };
    }

    const booking = await prisma.booking.create({
      data: {
        userId,
        masterProfileId,
        serviceId,
        dateTime,
      },
      select: { id: true },
    });

    revalidatePath(`/master/${masterProfileId}/book`);
    revalidatePath("/profile/me");
    return { bookingId: booking.id };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2003") return { error: "Пов’язаний запис не знайдено." };
      if (error.code === "P2002") return { error: "Такий запис уже існує." };
    }
    if (error instanceof Prisma.PrismaClientInitializationError) {
      return { error: "База даних недоступна." };
    }
    return { error: "Не вдалося зберегти запис." };
  }
}
