"use client";

import { useState, useMemo } from 'react';
import { Search, Tag } from 'lucide-react';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags?: string[];
  readTime?: string;
}

interface BlogSearchProps {
  posts: BlogPost[];
}

export default function BlogSearch({ posts }: BlogSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach(post => {
      post.tags?.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
  }, [posts]);

  // Filter posts based on search query and selected tag
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = searchQuery === '' || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTag = !selectedTag || 
        (post.tags && post.tags.includes(selectedTag));
      
      return matchesSearch && matchesTag;
    });
  }, [posts, searchQuery, selectedTag]);

  return (
    <div className="mb-8 sm:mb-10 md:mb-12">
      {/* Search Bar */}
      <div className="relative mb-6 sm:mb-8">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 sm:pl-4 pointer-events-none">
          <Search className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground transition-all duration-300" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search blog posts..."
          className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 rounded-lg sm:rounded-xl border border-input bg-background focus:ring-2 focus:ring-foreground focus:border-foreground transition-all duration-300 shadow-sm hover:shadow-md text-sm sm:text-base"
        />
      </div>

      {/* Tag Filter */}
      <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
        <button
          onClick={() => setSelectedTag(null)}
          className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium rounded-full transition-all duration-300 hover:scale-105 ${
            !selectedTag 
              ? 'bg-foreground text-background shadow-md' 
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
          }`}
        >
          All Posts
        </button>
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
            className={`inline-flex items-center gap-1 sm:gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium rounded-full transition-all duration-300 hover:scale-105 ${
              selectedTag === tag
                ? 'bg-foreground text-background shadow-md'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            <Tag className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 hover:scale-110" />
            {tag}
          </button>
        ))}
      </div>

      {/* Results Info */}
      <div className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6 transition-all duration-300">
        <span className="font-medium text-foreground">{filteredPosts.length}</span> {filteredPosts.length === 1 ? 'post' : 'posts'} found
        {(searchQuery || selectedTag) && (
          <button 
            onClick={() => {
              setSearchQuery('');
              setSelectedTag(null);
            }}
            className="ml-2 sm:ml-3 text-foreground hover:opacity-70 font-medium transition-all duration-300"
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}