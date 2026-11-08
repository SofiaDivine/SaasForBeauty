import { NextResponse } from "next/server";
import { isRecord, jsonError, prismaErrorResponse, readJson, UUID_RE } from "@/lib/api";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await readJson(request);
  if (!isRecord(body)) return jsonError("Очікується JSON-об’єкт.", 400);

  const userId = body.userId;
  const masterProfileId = body.masterProfileId;
  const serviceId = body.serviceId;
  const dateTime = body.dateTime;

  for (const [field, value] of [
    ["userId", userId],
    ["masterProfileId", masterProfileId],
    ["serviceId", serviceId],
  ] as const) {
    if (typeof value !== "string" || !UUID_RE.test(value)) {
      return jsonError(`${field} має бути UUID.`, 400);
    }
  }

  if (typeof dateTime !== "string" || Number.isNaN(Date.parse(dateTime))) {
    return jsonError("dateTime має бути датою в ISO-форматі.", 400);
  }

  try {
    const service = await prisma.service.findFirst({
      where: { id: serviceId as string, masterProfileId: masterProfileId as string },
      select: { id: true },
    });
    if (!service) {
      return jsonError("Послуга не належить цьому профілю майстра.", 400);
    }

    const booking = await prisma.booking.create({
      data: {
        userId: userId as string,
        masterProfileId: masterProfileId as string,
        serviceId: serviceId as string,
        dateTime: new Date(dateTime),
      },
    });
    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    return prismaErrorResponse(error);
  }
}
