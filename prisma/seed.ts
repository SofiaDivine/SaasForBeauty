import { PrismaClient } from "@prisma/client";
import { masters } from "../src/lib/catalog";

const prisma = new PrismaClient();

async function main() {
  const profileIds = masters.map((master) => master.profileId);
  const userIds = masters.map((master) => master.userId);

  await prisma.booking.deleteMany({ where: { masterProfileId: { in: profileIds } } });
  await prisma.subscription.deleteMany({ where: { masterProfileId: { in: profileIds } } });
  await prisma.bookmark.deleteMany({ where: { post: { masterProfileId: { in: profileIds } } } });
  await prisma.post.deleteMany({ where: { masterProfileId: { in: profileIds } } });
  await prisma.service.deleteMany({ where: { masterProfileId: { in: profileIds } } });
  await prisma.masterProfile.deleteMany({ where: { id: { in: profileIds } } });
  await prisma.user.deleteMany({ where: { id: { in: userIds } } });

  for (const master of masters) {
    await prisma.user.create({
      data: {
        id: master.userId,
        email: master.email,
        name: master.name,
        avatar: master.avatarUrl,
        role: "PRO_MASTER",
        bio: master.bio,
        instagramLink: master.instagram,
        masterProfile: {
          create: {
            id: master.profileId,
            profileType: master.profileType,
            gridLayout: master.gridLayout,
            location: master.location,
            niche: master.niche,
            services: {
              create: master.services.map((service) => ({
                id: service.id,
                title: service.title,
                durationMinutes: service.durationMinutes,
                price: service.price,
                isTfp: service.isTfp,
              })),
            },
            posts: {
              create: master.posts.map((post) => ({
                id: post.id,
                type: post.type,
                title: post.title,
                content: post.content,
                mediaUrls: post.mediaUrls,
              })),
            },
          },
        },
      },
    });
  }

  const profiles = await prisma.masterProfile.count({ where: { id: { in: profileIds } } });
  const posts = await prisma.post.count({ where: { masterProfileId: { in: profileIds } } });
  console.log(`Seeded ${profiles} profiles and ${posts} posts.`);
}

main()
  .catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
