'use client'

import { useStories } from "@/hooks/useStories";
import { useDeleteStory } from "@/hooks/useDeleteStory";
import Story from "@/components/Story";

export default function Stories() {
  const { data, isLoading } = useStories();
  const deleteStory = useDeleteStory();

  const onDelete = (id: number) => {
    deleteStory.mutate(id);
  }

  return (
    <main className="w-full mx-auto max-w-screen-lg">
      <div className="flex justify-center">
        <div className="container lg">
          {isLoading && <p className="text-white">Loading...</p>}
          {data.map((story) => (
            <Story key={story.id} story={story} onDelete={onDelete} />
          ))}
        </div>
      </div>
    </main>
  );
}
