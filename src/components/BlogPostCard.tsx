import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags?: string[];
  readTime?: string;
}

export default function BlogPostCard({ 
  post, 
  featured = false 
}: { 
  post: BlogPost; 
  featured?: boolean;
}) {
  return (
    <Link href={`/blog/${post.slug}`} className="transition-all duration-300 hover:scale-[1.02]">
      <Card className={cn(
        "group overflow-hidden transition-all duration-500 hover:shadow-xl border-0 bg-background h-full flex flex-col border border-border rounded-2xl",
        featured && "ring-1 ring-foreground/30"
      )}>
        <div className="p-4 sm:p-5 md:p-6 flex flex-col h-full">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </div>
            {post.readTime && (
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>{post.readTime}</span>
              </div>
            )}
          </div>
          
          <h2 className={cn(
            "font-bold mb-2 sm:mb-3 transition-opacity line-clamp-2",
            featured ? "text-xl sm:text-2xl md:text-3xl" : "text-lg sm:text-xl"
          )}>
            {post.title}
          </h2>
          
          <p className="text-muted-foreground mb-3 sm:mb-4 line-clamp-3 flex-grow text-sm sm:text-base">
            {post.excerpt}
          </p>
          
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-5">
              {post.tags.map((tag) => (
                <Badge 
                  key={tag} 
                  variant="secondary"
                  className="px-2 py-0.5 text-xs sm:text-xs rounded-full transition-all duration-300 hover:scale-105"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          
          <div className="mt-auto flex items-center justify-between">
            <span className="text-foreground font-medium flex items-center transition-all duration-300 group-hover:gap-1 sm:group-hover:gap-2 text-sm sm:text-base">
              Read more
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}