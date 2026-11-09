"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath, refresh } from "next/cache";
import { redirect } from "next/navigation";
import { UUID_RE } from "@/lib/api";
import { safeCallbackUrl } from "@/lib/callback-url";
import { getCurrentUser } from "@/lib/current-user";
import { prisma } from "@/lib/prisma";

export async function toggleBookmark(postId: string, returnTo?: string) {
  if (!UUID_RE.test(postId)) {
    return { ok: false, message: "Некоректний пост." };
  }

  const user = await getCurrentUser();
  if (!user) {
    const next = await safeCallbackUrl(returnTo);
    redirect(`/login?callbackUrl=${encodeURIComponent(next)}`);
  }

  const post = await prisma.post.findUnique({
    where: { id: postId },
    select: { id: true },
  });
  if (!post) {
    return { ok: false, message: "Цей пост не можна зберегти." };
  }

  const where = { userId_postId: { userId: user.id, postId } };
  const existing = await prisma.bookmark.findUnique({ where, select: { id: true } });

  try {
    if (existing) {
      await prisma.bookmark.delete({ where: { id: existing.id } });
    } else {
      await prisma.bookmark.create({ data: { userId: user.id, postId } });
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      revalidatePath("/profile/me");
      refresh();
      return { ok: true, saved: true };
    }
    return { ok: false, message: "Не вдалося зберегти пост." };
  }

  revalidatePath("/profile/me");
  refresh();
  return { ok: true, saved: !existing };
}
