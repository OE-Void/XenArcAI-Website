import { Metadata } from 'next';
import BlogPostLayout from '@/components/BlogPostLayout';

export const metadata: Metadata = {
  title: 'Welcome to the XenArcAI Blog',
  description: 'Our first blog post where we share our vision and what to expect from this blog.',
  openGraph: {
    title: 'Welcome to the XenArcAI Blog',
    description: 'Our first blog post where we share our vision and what to expect from this blog.',
    type: 'article',
    publishedTime: '2025-10-17',
    url: 'https://xenarcai.com/blog/welcome',
  },
};

export default function BlogPost() {
  return (
    <BlogPostLayout 
      title="Welcome to the XenArcAI Blog"
      date="2025-10-17"
      readTime="2 min read"
      tags={['announcement', 'ai', 'technology']}
    >
      <p className="text-lg">Welcome to the XenArcAI blog! We're excited to share our journey, insights, and the latest developments in AI with you.</p>
      
      <h2>Our Mission</h2>
      <p>At XenArcAI, we're dedicated to pushing the boundaries of artificial intelligence to create meaningful and ethical solutions. Our mission is to make AI accessible, understandable, and beneficial for everyone.</p>
      
      <h2>What to Expect</h2>
      <p>In this blog, we'll cover:</p>
      <ul>
        <li>Latest AI research and breakthroughs</li>
        <li>Tutorials and how-to guides</li>
        <li>Case studies and success stories</li>
        <li>Industry trends and analysis</li>
        <li>Team spotlights and company updates</li>
      </ul>
      
      <h2>Get Involved</h2>
      <p>We'd love to hear from you! Feel free to reach out with your thoughts, questions, or suggestions for future topics.</p>
      
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-700">
        <code className="text-sm">
          {`function helloWorld() {
  console.log("Hello, AI enthusiasts!");
}`}
        </code>
      </pre>
      
      <p>Stay tuned for more exciting content!</p>
    </BlogPostLayout>
  );
}
