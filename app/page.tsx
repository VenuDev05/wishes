import { Hero } from '@/components/hero';
import { Gallery } from '@/components/gallery';
import { Wishes } from '@/components/wishes';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <Gallery />
      <Wishes />
      <Footer />
    </main>
  );
}
