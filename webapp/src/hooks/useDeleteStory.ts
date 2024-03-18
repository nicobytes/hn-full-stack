import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteStory } from "@/fetchers/deleteStory";

export const useDeleteStory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteStory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['stories']
      })
    },
  })
};
