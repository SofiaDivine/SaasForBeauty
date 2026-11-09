import { cache } from "react";
import { UUID_RE } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export const getCurrentUser = cache(async () => {
  const session = await getSession();
  const id = session?.user?.id;
  if (!id || !UUID_RE.test(id)) return null;

  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      name: true,
      avatar: true,
      role: true,
    },
  });
});
