import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/current-user";

export async function savedPostIdsFor(postIds: string[]) {
  const user = await getCurrentUser();
  if (!user || postIds.length === 0) return [];

  const rows = await prisma.bookmark.findMany({
    where: { userId: user.id, postId: { in: postIds } },
    select: { postId: true },
  });
  return rows.map((row) => row.postId);
}

export async function listSavedPosts() {
  const user = await getCurrentUser();
  if (!user) return [];

  const rows = await prisma.bookmark.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    select: {
      post: {
        select: {
          id: true,
          type: true,
          title: true,
          content: true,
          mediaUrls: true,
          masterProfile: {
            select: {
              id: true,
              user: { select: { name: true } },
            },
          },
        },
      },
    },
  });

  return rows.map((row) => ({
    id: row.post.id,
    type: row.post.type,
    title: row.post.title,
    content: row.post.content,
    cover: row.post.mediaUrls[0] ?? null,
    masterId: row.post.masterProfile.id,
    masterName: row.post.masterProfile.user.name ?? "Майстер",
  }));
}
