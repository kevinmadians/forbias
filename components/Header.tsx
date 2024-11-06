'use client';

import Link from 'next/link';
import { ThemeToggle } from './theme/ThemeToggle';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-sm z-50 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="font-reenie text-2xl hover:opacity-75 transition-opacity">
            For Bias
          </Link>
          <nav className="flex items-center gap-8">
            <Link href="/submit" className="text-muted-foreground hover:text-foreground text-sm font-medium">
              Submit
            </Link>
            <Link href="/browse" className="text-muted-foreground hover:text-foreground text-sm font-medium">
              Browse
            </Link>
            <Link href="/support" className="text-muted-foreground hover:text-foreground text-sm font-medium">
              Support
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}