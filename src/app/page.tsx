import { HorizontalCarousel } from "@/components/feed/horizontal-carousel";
import { VerticalFocusFeed } from "@/components/feed/vertical-focus-feed";
import { carouselRails, samplePosts } from "@/lib/sample-feed";

export default function HomePage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-4 py-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Стрічка</h1>
        <p className="max-w-2xl text-stone-600">
          Горизонтальні добірки за типом пропозиції і вертикальна стрічка оголошень.
        </p>
      </header>
      <div className="space-y-8">
        {carouselRails.map((rail) => (
          <HorizontalCarousel
            key={rail.type}
            title={rail.title}
            href={rail.href}
            posts={samplePosts.filter((post) => post.type === rail.type)}
          />
        ))}
      </div>
      <VerticalFocusFeed posts={samplePosts} />
    </main>
  );
}
