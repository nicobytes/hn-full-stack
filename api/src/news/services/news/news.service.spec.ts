import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Story } from '@database/entities/story.entity';
import { DeletedStories } from '@database/entities/deleted.entity';

import { NewsService } from './news.service';

const mockStory = new Story();
mockStory.id = 1;
mockStory.title = 'test';
mockStory.url = 'test';
mockStory.text = 'test';
mockStory.author = 'test';
mockStory.createdAt = new Date();
mockStory.updatedAt = new Date();

const mockDeletedStory = new DeletedStories();
mockDeletedStory.id = 1;
mockDeletedStory.storyId = 2;
mockDeletedStory.createdAt = new Date();
mockDeletedStory.updatedAt = new Date();

describe('NewsService', () => {
  let service: NewsService;
  let storyRepo: Repository<Story>;
  let deletedStoriesRepo: Repository<DeletedStories>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NewsService,
        {
          provide: getRepositoryToken(Story),
          useValue: {
            find: jest.fn(),
            findOneBy: jest.fn(),
            save: jest.fn(),
            remove: jest.fn(),
            delete: jest.fn().mockResolvedValue({
              raw: '',
              affected: 1,
            }),
            create: jest.fn().mockReturnValue(mockStory),
            findOneByOrFail: jest.fn().mockReturnValue(mockStory),
          },
        },
        {
          provide: getRepositoryToken(DeletedStories),
          useValue: {
            find: jest.fn(),
            findOneBy: jest.fn(),
            save: jest.fn().mockReturnValue(mockDeletedStory),
            remove: jest.fn(),
            delete: jest.fn().mockResolvedValue({
              raw: '',
              affected: 1,
            }),
            create: jest.fn().mockReturnValue(mockDeletedStory),
          },
        },
      ],
    }).compile();

    service = module.get<NewsService>(NewsService);
    storyRepo = module.get<Repository<Story>>(getRepositoryToken(Story));
    deletedStoriesRepo = module.get<Repository<DeletedStories>>(
      getRepositoryToken(DeletedStories),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getAll', async () => {
    // arrange
    const spyStoryRepo = jest.spyOn(storyRepo, 'find').mockResolvedValue([]);
    // act
    const data = await service.getAll();
    // assert
    expect(data.length).toEqual(0);
    expect(spyStoryRepo).toHaveBeenCalled();
  });

  it('deleteStory', async () => {
    // arrange
    const spyStoryRepo = jest.spyOn(deletedStoriesRepo, 'create');
    // act
    const data = await service.deleteStory(1);
    // assert
    expect(data.affected).toEqual(1);
    expect(spyStoryRepo).toHaveBeenCalled();
  });
});
