import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MarqueeMessages } from '@/components/messages/MarqueeMessages';

export default function Home() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <h1 className="font-reenie text-4xl sm:text-5xl md:text-6xl mb-4 text-foreground">
          a bunch of the untold words, sent through the song
        </h1>
        <p className="text-muted-foreground mb-8">
          Express your untold message through the song
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/submit" className="flex items-center gap-2">
              Tell Your Story <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/support" className="flex items-center gap-2">
              Support For Bias <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-card rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
            <h2 className="font-reenie text-2xl mb-3 text-foreground">Share Your Message</h2>
            <p className="text-muted-foreground text-sm mb-4">
              Choose a song and write a heartfelt message to someone special.
            </p>
            <Button asChild variant="default" className="w-full">
              <Link href="/submit" className="flex items-center justify-center gap-2">
                Create Message <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          <div className="bg-card rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
            <h2 className="font-reenie text-2xl mb-3 text-foreground">Browse Messages</h2>
            <p className="text-muted-foreground text-sm mb-4">
              Find messages that were written for you. Search by your name to discover heartfelt dedications.
            </p>
            <Button asChild variant="default" className="w-full">
              <Link href="/browse" className="flex items-center justify-center gap-2">
                Start Browsing <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          <div className="bg-card rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
            <h2 className="font-reenie text-2xl mb-3 text-foreground">Detail Messages</h2>
            <p className="text-muted-foreground text-sm mb-4">
              You can click on any message card to read the full story and listen to the chosen song!
            </p>
          </div>
        </div>
      </section>

      {/* Marquee Messages */}
      <section>
        <MarqueeMessages />
      </section>
    </div>
  );
}