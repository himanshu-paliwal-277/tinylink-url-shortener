'use client';

import { format } from 'date-fns';
import { ArrowLeft, Copy, ExternalLink, Link2, RefreshCw, TrendingUp } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React, { memo } from 'react';
import { toast } from 'sonner';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useFetchSingleLink } from '@/hooks/useFetchSingleLink';

const StatsPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const code = params.code as string;

  const { link, isLoading, isError, error, refetch } = useFetchSingleLink(code);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const getShortUrl = () => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/${code}`;
    }
    return `/${code}`;
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-7xl">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-10 w-48" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-4 w-24" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-16" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError || !link) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-7xl">
        <div className="flex flex-col gap-4">
          <Button variant="ghost" onClick={() => router.push('/')} className="w-fit">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {(error as { error?: string })?.error || 'Link not found. It may have been deleted.'}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <Button variant="ghost" onClick={() => router.push('/')} className="w-fit">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>

          <div className="flex items-center gap-2">
            <TrendingUp className="h-8 w-8" />
            <h1 className="text-4xl font-bold">Link Statistics</h1>
          </div>
          <p className="text-lg text-muted-foreground">Detailed analytics for your short link</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Clicks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{link.totalClicks}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Created</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-semibold">
                {format(new Date(link.createdAt), 'MMM dd, yyyy')}
              </div>
              <div className="text-sm text-muted-foreground">
                {format(new Date(link.createdAt), 'hh:mm a')}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Last Clicked
              </CardTitle>
            </CardHeader>
            <CardContent>
              {link.lastClicked ? (
                <>
                  <div className="text-lg font-semibold">
                    {format(new Date(link.lastClicked), 'MMM dd, yyyy')}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {format(new Date(link.lastClicked), 'hh:mm a')}
                  </div>
                </>
              ) : (
                <div className="text-lg text-muted-foreground">Never</div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Link Details */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Link Details</CardTitle>
              <Button variant="outline" size="icon" onClick={() => refetch()}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Short Code */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Link2 className="h-4 w-4 text-muted-foreground" />
                <label className="text-sm font-medium text-muted-foreground">Short Code</label>
              </div>
              <div className="flex items-center gap-2">
                <code className="flex-1 rounded bg-muted px-4 py-3 text-lg font-mono">
                  {link.code}
                </code>
                <Button variant="outline" size="sm" onClick={() => copyToClipboard(link.code)}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Short URL */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Link2 className="h-4 w-4 text-muted-foreground" />
                <label className="text-sm font-medium text-muted-foreground">Short URL</label>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 rounded bg-muted px-4 py-3 text-base break-all">
                  {getShortUrl()}
                </div>
                <Button variant="outline" size="sm" onClick={() => copyToClipboard(getShortUrl())}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Target URL */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
                <label className="text-sm font-medium text-muted-foreground">Target URL</label>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 rounded bg-muted px-4 py-3 text-base break-all">
                  {link.targetUrl}
                </div>
                <a href={link.targetUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </a>
                <Button variant="outline" size="sm" onClick={() => copyToClipboard(link.targetUrl)}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Status Badge */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">Status:</span>
              <Badge variant={link.totalClicks > 0 ? 'default' : 'secondary'}>
                {link.totalClicks > 0 ? 'Active' : 'Unused'}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default memo(StatsPage);
