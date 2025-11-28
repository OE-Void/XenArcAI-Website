'use client';

import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Share2, Facebook, Twitter, Linkedin, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BlogPostProps {
  title: string;
  date: string;
  readTime: string;
  tags: string[];
  children: React.ReactNode;
}

export default function BlogPostLayout({ 
  title, 
  date, 
  readTime, 
  tags, 
  children
}: Omit<BlogPostProps, 'slug'>) {
  return (
    <article className="container max-w-4xl py-6 sm:py-8 md:py-12 lg:py-16 mx-auto px-4 sm:px-6">
      {/* Breadcrumb */}
      <div className="mb-6 sm:mb-8">
        <Link 
          href="/" 
          className="inline-flex items-center gap-1.5 sm:gap-2 text-foreground hover:opacity-70 transition-opacity mb-3 sm:mb-4 text-sm sm:text-base"
        >
          <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
          <span>Back to Home</span>
        </Link>
        
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground mt-4 sm:mt-6">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
            <time dateTime={date}>{formatDate(date)}</time>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>{readTime}</span>
          </div>
        </div>
      </div>
      
      {/* Title Section */}
      <header className="mb-8 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4 sm:mb-6">
          {title}
        </h1>
        
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {tags.map((tag) => (
            <Badge 
              key={tag} 
              variant="secondary"
              className="px-2.5 py-1 text-xs sm:text-sm rounded-full transition-all duration-300 hover:scale-105"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </header>

      {/* Content */}
      <div className="prose prose-sm sm:prose-base md:prose-lg dark:prose-invert max-w-none prose-headings:text-foreground prose-h2:mt-8 sm:prose-h2:mt-10 md:prose-h2:mt-12 prose-h3:mt-6 sm:prose-h3:mt-7 md:prose-h3:mt-8 prose-h4:mt-4 sm:prose-h4:mt-5 md:prose-h4:mt-6 prose-p:leading-relaxed prose-img:rounded-lg prose-img:border prose-img:border-gray-200 dark:prose-img:border-gray-700">
        {children}
      </div>

      {/* Social Sharing Section */}
      <div className="mt-12 sm:mt-14 md:mt-16 pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 sm:gap-8">
          <div className="flex-1">
            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Share this post</h3>
            <p className="text-muted-foreground mb-3 sm:mb-4 text-sm sm:text-base">Help spread the word about this article!</p>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                }}
                className="rounded-full border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-300 hover:scale-105 text-xs sm:text-sm"
              >
                <Twitter className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Twitter
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                }}
                className="rounded-full border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-300 hover:scale-105 text-xs sm:text-sm"
              >
                <Facebook className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Facebook
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                }}
                className="rounded-full border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-300 hover:scale-105 text-xs sm:text-sm"
              >
                <Linkedin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                LinkedIn
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                }}
                className="rounded-full border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-300 hover:scale-105 text-xs sm:text-sm"
              >
                <Share2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Copy Link
              </Button>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0">
            <Link 
              href="/" 
              className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-foreground text-background rounded-full hover:opacity-90 transition-all duration-300 hover:scale-105 text-sm sm:text-base"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}