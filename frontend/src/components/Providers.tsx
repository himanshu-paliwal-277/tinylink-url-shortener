'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { LinkProvider } from '@/context/LinkContext';

import { Toaster } from './ui/sonner';

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      })
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [router]);

  return (
    <QueryClientProvider client={queryClient}>
      <LinkProvider>
        {children}
        <Toaster />
      </LinkProvider>
    </QueryClientProvider>
  );
}
