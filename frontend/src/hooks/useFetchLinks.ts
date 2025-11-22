import { useQuery } from '@tanstack/react-query';

import { fetchAllLinksRequest } from '@/apis/links';

export const useFetchLinks = (page: number = 1, limit: number = 10, search: string = '') => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['links', page, limit, search],
    queryFn: () => fetchAllLinksRequest(page, limit, search),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true,
  });

  return {
    links: data?.data || [],
    pagination: data?.pagination,
    isLoading,
    isError,
    error,
    refetch,
  };
};
