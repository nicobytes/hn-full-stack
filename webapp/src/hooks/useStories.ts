import { useQuery } from '@tanstack/react-query';
import { getStories } from "@/fetchers/getStories";
import { Story } from "@/models/story.model";

export const useStories = () => {
  return useQuery<Story[]>({
    queryKey: ["stories"],
    initialData: [],
    queryFn: () => getStories(),
  })
};
