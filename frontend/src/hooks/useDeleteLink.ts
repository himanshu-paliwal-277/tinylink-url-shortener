import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deleteLinkRequest } from '@/apis/links';

export const useDeleteLink = () => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: deleteLinkMutation,
    isPending,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: (code: string) => deleteLinkRequest(code),
    onSuccess: (data) => {
      console.log('Link deleted successfully', data);
      toast.success('Link deleted successfully!');
      // Invalidate and refetch all links
      queryClient.invalidateQueries({ queryKey: ['links'] });
    },
    onError: (error: { error?: string; message?: string }) => {
      console.error('Error deleting link', error);
      toast.error(error?.error || error?.message || 'Failed to delete link');
    },
  });

  return {
    deleteLinkMutation,
    isPending,
    isSuccess,
    error,
  };
};
