import { NextResponse } from "next/server";
import { isRecord, jsonError, prismaErrorResponse, readJson, UUID_RE } from "@/lib/api";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await readJson(request);
  if (!isRecord(body)) return jsonError("Очікується JSON-об’єкт.", 400);

  const followerId = body.followerId;
  const masterProfileId = body.masterProfileId;

  if (typeof followerId !== "string" || !UUID_RE.test(followerId)) {
    return jsonError("followerId має бути UUID.", 400);
  }
  if (typeof masterProfileId !== "string" || !UUID_RE.test(masterProfileId)) {
    return jsonError("masterProfileId має бути UUID.", 400);
  }

  try {
    const subscription = await prisma.subscription.create({
      data: { followerId, masterProfileId },
    });
    return NextResponse.json(subscription, { status: 201 });
  } catch (error) {
    return prismaErrorResponse(error);
  }
}
