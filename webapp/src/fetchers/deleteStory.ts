import { API_NEWS } from '@/env';
import { Story } from '@/models/story.model';

export async function deleteStory(storyId: number): Promise<Story> {
  const res = await fetch(`${API_NEWS}/api/v1/news/${storyId}`, {
    method: 'DELETE',
  })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json() as unknown as Story;
}
