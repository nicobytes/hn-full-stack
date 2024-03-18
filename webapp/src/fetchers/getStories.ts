import { Story } from '@/models/story.model';
import { API_NEWS } from '@/env';

export async function getStories(): Promise<Story[]> {
  const res = await fetch(`${API_NEWS}/api/v1/news`)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json() as unknown as Story[];
}
