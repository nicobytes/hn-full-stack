import { Story as StoryModel } from '@/models/story.model';
import { formatDay } from "@/utils/formatDate";
import { TrashIcon } from "@heroicons/react/24/solid";

export interface Props {
  story: StoryModel;
  onDelete: (id: number) => void;
}

export default function Story({story, onDelete}: Props) {
  return (
    <article className='group my-4 bg-white p-5 flex space-x-2 items-center justify-between shadow-md transition-transform duration-300 ease-out hover:scale-[1.03]'>
      <div className='flex flex-col'>
        <a href={story.url} target='_blank'>
          <h3 className='text-lg font-semibold'>{story.title}</h3>
        </a>
        <div className='flex space-x-2'>
          <p>by <span className='font-bold'>{story.author}</span></p>
          <p>{formatDay(story.createdAt)}</p>
        </div>
      </div>
      <div className='hidden group-hover:block'>
        <button onClick={() => onDelete(story.id)} className='text-red-400 p-2'>
         <TrashIcon className='h-8 w-8' />
        </button>
      </div>
    </article>
  );
}
