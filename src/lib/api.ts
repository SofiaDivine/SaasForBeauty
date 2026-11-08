import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export async function readJson(request: Request): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function prismaErrorResponse(error: unknown) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      return jsonError("Такий запис уже існує.", 409);
    }
    if (error.code === "P2003") {
      return jsonError("Пов’язаний запис не знайдено.", 400);
    }
  }

  if (error instanceof Prisma.PrismaClientInitializationError) {
    return jsonError("База даних недоступна.", 503);
  }

  return jsonError("Не вдалося зберегти запис.", 500);
}
