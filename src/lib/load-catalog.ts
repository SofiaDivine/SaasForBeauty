import type { FeedCategory, FeedPost } from "@/lib/sample-feed";
import { mediaKindOf, nicheLabel } from "@/lib/sample-feed";
import {
  catalogPosts,
  masterById,
  masters,
  type CatalogMaster,
  type CatalogPost,
  type CatalogService,
} from "@/lib/catalog";
import { prisma } from "@/lib/prisma";

const nicheIds = new Set<string>(Object.keys(nicheLabel));

function isNiche(value: string | null | undefined): value is FeedCategory {
  return typeof value === "string" && nicheIds.has(value);
}

function withTimeout<T>(promise: Promise<T>, ms: number) {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("db-timeout")), ms);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error: unknown) => {
        clearTimeout(timer);
        reject(error);
      },
    );
  });
}

function toFeedPost(
  post: { id: string; type: FeedPost["type"]; title: string; content: string | null; mediaUrls: string[] },
  master: { name: string; profileId: string; location: string; niche: FeedCategory },
): FeedPost {
  const mediaUrl = post.mediaUrls[0];
  return {
    id: post.id,
    type: post.type,
    category: master.niche,
    title: post.title,
    content: post.content ?? "",
    masterName: master.name,
    masterId: master.profileId,
    location: master.location,
    mediaUrl,
    mediaKind: mediaUrl ? mediaKindOf(mediaUrl) : undefined,
  };
}

export async function loadFeedPosts(): Promise<FeedPost[]> {
  try {
    const rows = await withTimeout(
      prisma.post.findMany({
        orderBy: { createdAt: "desc" },
        include: {
          masterProfile: { include: { user: { select: { name: true } } } },
        },
      }),
      2000,
    );
    const posts = rows.flatMap((row) => {
      const known = masterById(row.masterProfileId);
      const name = row.masterProfile.user.name ?? known?.name;
      const location = row.masterProfile.location ?? known?.location;
      const niche = isNiche(row.masterProfile.niche) ? row.masterProfile.niche : known?.niche;
      if (!niche || !name || !location) return [];
      return [
        toFeedPost(row, {
          name,
          profileId: row.masterProfileId,
          location,
          niche,
        }),
      ];
    });
    return posts.length > 0 ? posts : catalogPosts;
  } catch {
    return catalogPosts;
  }
}

export async function loadMaster(id: string): Promise<CatalogMaster | null> {
  const fallback = masterById(id);
  try {
    const row = await withTimeout(
      prisma.masterProfile.findUnique({
        where: { id },
        include: {
          user: true,
          services: { orderBy: { title: "asc" } },
          posts: { orderBy: { createdAt: "desc" } },
        },
      }),
      2000,
    );
    if (!row || !row.user.name) return fallback;
    const niche = isNiche(row.niche) ? row.niche : fallback?.niche;
    if (!niche) return fallback;
    const services: CatalogService[] = row.services.map((service) => ({
      id: service.id,
      title: service.title,
      durationMinutes: service.durationMinutes,
      price: service.price.toString(),
      isTfp: service.isTfp,
    }));
    const posts: CatalogPost[] = row.posts.map((post) => ({
      id: post.id,
      type: post.type,
      title: post.title,
      content: post.content ?? "",
      mediaUrls: post.mediaUrls,
    }));
    if (posts.length === 0 && fallback) return fallback;
    return {
      profileId: row.id,
      userId: row.userId,
      name: row.user.name,
      email: row.user.email,
      avatarUrl: row.user.avatar ?? fallback?.avatarUrl ?? "",
      bio: row.user.bio ?? fallback?.bio ?? "",
      instagram: row.user.instagramLink ?? "",
      location: row.location ?? fallback?.location ?? "",
      niche,
      profileType: row.profileType,
      gridLayout: row.gridLayout,
      services: services.length > 0 ? services : (fallback?.services ?? []),
      posts: posts.length > 0 ? posts : (fallback?.posts ?? []),
    };
  } catch {
    return fallback;
  }
}

export function catalogMasterIds() {
  return masters.map((master) => master.profileId);
}
