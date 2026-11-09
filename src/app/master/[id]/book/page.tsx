import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { BookingCalendar } from "@/components/booking/BookingCalendar";
import { isPaidService, type ServiceNotice } from "@/lib/booking";
import { extraPostIdsForService, serviceIdForPost } from "@/lib/catalog";
import { loadMaster } from "@/lib/load-catalog";

function noticeRank(
  notice: { postId: string; type: ServiceNotice["type"] },
  requestedPostId?: string,
) {
  if (requestedPostId && notice.postId === requestedPostId) return 0;
  if (notice.type === "PROMO") return 1;
  if (notice.type === "NEW_ITEM") return 2;
  return 3;
}

export const metadata: Metadata = {
  title: "Запис · TFP-Bundle",
};

export default function MasterBookingPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ service?: string; post?: string }>;
}) {
  return (
    <Suspense fallback={<p className="px-4 py-8 text-sm text-stone-600">Завантажуємо календар…</p>}>
      <BookingContent params={params} searchParams={searchParams} />
    </Suspense>
  );
}

async function BookingContent({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ service?: string; post?: string }>;
}) {
  const { id } = await params;
  const { service: requestedServiceId, post: requestedPostId } = await searchParams;
  const master = await loadMaster(id);
  const notices = (master?.posts ?? []).flatMap((post) => {
    const serviceId = serviceIdForPost(post.id);
    if (!serviceId || !post.content.trim()) return [];
    const notice: ServiceNotice & { serviceId: string } = {
      serviceId,
      postId: post.id,
      type: post.type,
      title: post.title,
      content: post.content,
    };
    return [notice];
  });
  const services = (master?.services ?? []).filter(isPaidService).map((service) => {
    const extras = extraPostIdsForService(service.id).flatMap((postId) => {
      const post = master?.posts.find((item) => item.id === postId);
      if (!post?.content.trim()) return [];
      const notice: ServiceNotice & { serviceId: string } = {
        serviceId: service.id,
        postId: post.id,
        type: post.type,
        title: post.title,
        content: post.content,
      };
      return [notice];
    });
    const related = [...notices.filter((notice) => notice.serviceId === service.id), ...extras];
    return {
      ...service,
      notices: related
        .sort((a, b) => noticeRank(a, requestedPostId) - noticeRank(b, requestedPostId))
        .map(({ postId, type, title, content }) => ({ postId, type, title, content })),
    };
  });
  const initialServiceId = services.some((service) => service.id === requestedServiceId)
    ? requestedServiceId
    : undefined;

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-4 py-8">
      <header className="space-y-2">
        <Link
          href={`/master/${id}`}
          className="text-sm text-stone-600 underline-offset-4 hover:underline"
        >
          До профілю
        </Link>
        <h1 className="text-3xl font-semibold tracking-tight">Запис</h1>
        <p className="text-stone-600">
          Оберіть послугу, день і годину. Робочий час салону — 09:00–18:00.
        </p>
      </header>
      <BookingCalendar
        masterProfileId={id}
        services={services}
        initialServiceId={initialServiceId}
      />
    </main>
  );
}
