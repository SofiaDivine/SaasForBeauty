import { PostType } from "@prisma/client";
import { NextResponse } from "next/server";
import { isRecord, jsonError, prismaErrorResponse, readJson, UUID_RE } from "@/lib/api";
import { prisma } from "@/lib/prisma";

const postTypes = new Set<string>(Object.values(PostType));

export async function POST(request: Request) {
  const body = await readJson(request);
  if (!isRecord(body)) return jsonError("Очікується JSON-об’єкт.", 400);

  const masterProfileId = body.masterProfileId;
  const type = body.type;
  const title = body.title;
  const content = body.content;
  const mediaUrls = body.mediaUrls;

  if (typeof masterProfileId !== "string" || !UUID_RE.test(masterProfileId)) {
    return jsonError("masterProfileId має бути UUID.", 400);
  }
  if (typeof type !== "string" || !postTypes.has(type)) {
    return jsonError("type має бути TFP, PROMO, GIVEAWAY або NEW_ITEM.", 400);
  }
  if (typeof title !== "string" || title.trim().length === 0) {
    return jsonError("title обов’язковий.", 400);
  }
  if (content !== undefined && typeof content !== "string") {
    return jsonError("content має бути рядком.", 400);
  }
  if (
    mediaUrls !== undefined &&
    (!Array.isArray(mediaUrls) || mediaUrls.some((url) => typeof url !== "string"))
  ) {
    return jsonError("mediaUrls має бути масивом рядків.", 400);
  }

  try {
    const post = await prisma.post.create({
      data: {
        masterProfileId,
        type: type as PostType,
        title: title.trim(),
        content,
        mediaUrls: mediaUrls ?? [],
      },
    });
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    return prismaErrorResponse(error);
  }
}
