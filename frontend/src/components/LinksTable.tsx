'use client';

import { formatDistanceToNow } from 'date-fns';
import { Check, Copy, ExternalLink, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import type { Link as LinkType } from '@/types/link';

import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

interface LinksTableProps {
  links: LinkType[];
  isLoading: boolean;
  // eslint-disable-next-line no-unused-vars
  onDelete: (code: string) => void;
  isDeleting: boolean;
}

export function LinksTable({ links, isLoading, onDelete }: LinksTableProps) {
  const router = useRouter();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getShortUrl = (code: string) => {
    return `${window.location.origin}/${code}`;
  };

  if (isLoading) {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Short Code</TableHead>
              <TableHead>Target URL</TableHead>
              <TableHead className="text-center">Total Clicks</TableHead>
              <TableHead>Last Clicked</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className="h-4 w-20" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-64" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-8 mx-auto" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-32" />
                </TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    {/* <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" /> */}
                    <Skeleton className="h-8 w-8" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (links.length === 0) {
    return (
      <div className="rounded-md border border-dashed p-8 text-center">
        <p className="text-muted-foreground">No links yet. Create your first short link!</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Short Code</TableHead>
            <TableHead className="w-[400px]">Target URL</TableHead>
            <TableHead className="w-[120px] text-center">Total Clicks</TableHead>
            <TableHead className="w-[180px]">Last Clicked</TableHead>
            <TableHead className="w-[100px] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {links.map((link) => (
            <TableRow
              key={link._id}
              onClick={() => {
                router.push(`/code/${link.code}`);
              }}
              className="cursor-pointer"
            >
              <TableCell className="font-medium w-[200px]">
                <div className="flex items-center gap-2">
                  <code className="rounded bg-muted px-2 py-1 text-sm">{link.code}</code>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(getShortUrl(link.code), link._id);
                    }}
                  >
                    {copiedId === link._id ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </TableCell>
              <TableCell className="w-[400px]">
                <div className="flex items-center gap-2 max-w-[400px]">
                  <span className="truncate block" title={link.targetUrl}>
                    {link.targetUrl}
                  </span>
                  <a
                    href={link.targetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 cursor-pointer">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </TableCell>
              <TableCell className="text-center w-[120px]">
                <Badge variant="secondary">{link.totalClicks}</Badge>
              </TableCell>
              <TableCell className="w-[180px]">
                {link.lastClicked ? (
                  <span className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(link.lastClicked), { addSuffix: true })}
                  </span>
                ) : (
                  <span className="text-sm text-muted-foreground">Never</span>
                )}
              </TableCell>
              <TableCell className="w-[100px]">
                <div className="flex justify-end gap-2">
                  {/* <Link href={`/code/${link.code}`}>
                    <Button variant="ghost" size="sm">
                      <TrendingUp className="h-4 w-4" />
                    </Button>
                  </Link> */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(link.code);
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
