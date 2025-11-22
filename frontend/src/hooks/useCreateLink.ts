import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createLinkRequest } from '@/apis/links';
import type { CreateLinkInput } from '@/types/link';

export const useCreateLink = () => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: createLinkMutation,
    isPending,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: (data: CreateLinkInput) => createLinkRequest(data),
    onSuccess: (data) => {
      console.log('Link created successfully', data);
      toast.success('Link created successfully!');
      // Invalidate and refetch all links
      queryClient.invalidateQueries({ queryKey: ['links'] });
    },
    onError: (error: { error?: string; message?: string }) => {
      console.error('Error creating link', error);
      toast.error(error?.error || error?.message || 'Failed to create link');
    },
  });

  return {
    createLinkMutation,
    isPending,
    isSuccess,
    error,
  };
};
