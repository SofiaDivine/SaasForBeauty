import { Prisma } from "@prisma/client";
import NextAuth from "next-auth";
import type { Profile } from "next-auth";
import { authConfig } from "@/auth.config";
import { prisma } from "@/lib/prisma";

function googleAccount(profile: Profile | undefined) {
  const email = profile?.email?.trim().toLowerCase();
  if (!email || profile?.email_verified !== true) return null;

  const name = profile.name?.trim() || null;
  const avatar = typeof profile.picture === "string" ? profile.picture : null;

  return { email, name, avatar };
}

async function saveGoogleUser(account: { email: string; name: string | null; avatar: string | null }) {
  const existing = await prisma.user.findUnique({
    where: { email: account.email },
    select: { id: true, name: true, avatar: true },
  });

  if (!existing) {
    await prisma.user.create({
      data: {
        email: account.email,
        name: account.name,
        avatar: account.avatar,
      },
    });
    return;
  }

  if ((existing.name && existing.avatar) || (!account.name && !account.avatar)) return;

  await prisma.user.update({
    where: { id: existing.id },
    data: {
      name: existing.name ?? account.name,
      avatar: existing.avatar ?? account.avatar,
    },
  });
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  callbacks: {
    ...authConfig.callbacks,
    async signIn({ account, profile }) {
      if (account?.provider !== "google") return false;

      const googleUser = googleAccount(profile);
      if (!googleUser) return false;

      try {
        await saveGoogleUser(googleUser);
        return true;
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
          return true;
        }
        console.error("Failed to save Google user");
        return "/login?error=Database";
      }
    },
    async jwt({ token, trigger }) {
      if (trigger !== "signIn" || !token.email) return token;

      const dbUser = await prisma.user.findUnique({
        where: { email: token.email.toLowerCase() },
        select: { id: true, name: true, avatar: true },
      });
      if (!dbUser) return token;

      token.userId = dbUser.id;
      if (dbUser.name) token.name = dbUser.name;
      if (dbUser.avatar) token.picture = dbUser.avatar;
      return token;
    },
    async session({ session, token }) {
      if (session.user && typeof token.userId === "string") {
        session.user.id = token.userId;
      }
      return session;
    },
  },
});
