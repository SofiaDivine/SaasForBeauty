import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/current-user";

export async function listMyBookings() {
  const user = await getCurrentUser();
  if (!user) return [];

  const rows = await prisma.booking.findMany({
    where: { userId: user.id },
    orderBy: { dateTime: "asc" },
    select: {
      id: true,
      dateTime: true,
      status: true,
      service: {
        select: { title: true, durationMinutes: true, price: true, isTfp: true },
      },
      masterProfile: {
        select: {
          id: true,
          user: { select: { name: true } },
        },
      },
    },
  });

  return rows.map((row) => ({
    id: row.id,
    dateTime: row.dateTime,
    status: row.status,
    serviceTitle: row.service.title,
    durationMinutes: row.service.durationMinutes,
    price: row.service.price.toString(),
    isTfp: row.service.isTfp,
    masterId: row.masterProfile.id,
    masterName: row.masterProfile.user.name ?? "Майстер",
  }));
}
