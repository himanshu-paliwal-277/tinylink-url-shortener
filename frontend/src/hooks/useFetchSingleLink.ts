import { useQuery } from '@tanstack/react-query';

import { fetchSingleLinkRequest } from '@/apis/links';

export const useFetchSingleLink = (code: string) => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['link', code],
    queryFn: () => fetchSingleLinkRequest(code),
    enabled: !!code,
    staleTime: 1000 * 60 * 1, // 1 minute (for stats)
    refetchOnWindowFocus: true,
  });

  return {
    link: data?.data,
    isLoading,
    isError,
    error,
    refetch,
  };
};
