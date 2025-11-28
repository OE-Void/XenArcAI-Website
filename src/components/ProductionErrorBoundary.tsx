'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ProductionErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to monitoring service in production
    console.error('Production Error:', error, errorInfo);
    
    // In a real application, you would send this to an error reporting service
    // like Sentry, Bugsnag, or a custom logging solution
  }

  handleReload = () => {
    // Attempt to recover by reloading the page
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
          <div className="max-w-md w-full space-y-6 text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 dark:bg-red-900">
              <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-300" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Something went wrong</h2>
              <p className="mt-2 text-muted-foreground">
                We're sorry, but an unexpected error occurred. Our team has been notified.
              </p>
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="mt-4 p-4 bg-muted rounded text-left text-sm">
                  <p className="font-mono text-red-500">{this.state.error.message}</p>
                  <pre className="mt-2 text-xs overflow-auto max-h-32">
                    {this.state.error.stack}
                  </pre>
                </div>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={this.handleReload} className="flex items-center gap-2">
                <RotateCcw className="h-4 w-4" />
                Reload Page
              </Button>
              <Button variant="outline" asChild>
                <a href="/">Go Home</a>
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}