'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface LegalLayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function LegalLayout({ title, children }: LegalLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl py-8 sm:py-12 md:py-16 mx-auto px-4 sm:px-6">
        <div className="mb-6 sm:mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-foreground hover:opacity-70 transition-opacity text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
        
        <header className="mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            {title}
          </h1>
        </header>

        <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none prose-headings:text-foreground prose-p:leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}