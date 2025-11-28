import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Download, Video, FileText, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Resources',
  description: 'Resources and documentation for XenArcAI',
};

export default function Resources() {
  const resources = [
    {
      title: "Documentation",
      description: "Comprehensive guides and API references for our tools and services.",
      icon: BookOpen,
      link: "#",
      type: "internal"
    },
    {
      title: "Research Papers",
      description: "Access to our latest research publications and technical reports.",
      icon: FileText,
      link: "#",
      type: "internal"
    },
    {
      title: "Tutorials",
      description: "Step-by-step guides and video tutorials to help you get started.",
      icon: Video,
      link: "#",
      type: "internal"
    },
    {
      title: "Datasets",
      description: "Download publicly available datasets used in our research.",
      icon: Download,
      link: "#",
      type: "internal"
    },
    {
      title: "GitHub Repositories",
      description: "Browse our open source projects and contribute to our codebase.",
      icon: ExternalLink,
      link: "https://github.com/xenarcai",
      type: "external"
    },
    {
      title: "Community Forum",
      description: "Connect with other researchers and developers in our community.",
      icon: ExternalLink,
      link: "#",
      type: "external"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-6xl py-8 sm:py-12 md:py-16 mx-auto px-4 sm:px-6">
        <div className="mb-6 sm:mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-foreground hover:opacity-70 transition-opacity text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
        
        <header className="mb-8 sm:mb-12 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
            Resources
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our collection of documentation, tutorials, research papers, and other resources to help you make the most of our tools and services.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <div 
                key={index}
                className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{resource.title}</h3>
                </div>
                <p className="text-muted-foreground mb-4">{resource.description}</p>
                <Link 
                  href={resource.link}
                  target={resource.type === "external" ? "_blank" : "_self"}
                  className="inline-flex items-center gap-1 text-primary hover:underline text-sm font-medium"
                >
                  {resource.type === "external" ? "Visit" : "Explore"}
                  {resource.type === "external" && <ExternalLink className="w-3 h-3" />}
                </Link>
              </div>
            );
          })}
        </div>

        <div className="mt-12 sm:mt-16 p-6 sm:p-8 bg-muted rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Need Help?</h2>
          <p className="text-muted-foreground mb-4">
            If you can't find what you're looking for, our support team is here to help. 
            Contact us at resources@xenarcai.com or visit our community forum.
          </p>
          <Link 
            href="mailto:resources@xenarcai.com"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}