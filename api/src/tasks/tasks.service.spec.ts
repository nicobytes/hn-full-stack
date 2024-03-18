import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule, registerAs } from '@nestjs/config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { Story } from '@database/entities/story.entity';
import { DeletedStories } from '@database/entities/deleted.entity';
import { TasksService, HNResponse } from './tasks.service';
import { of } from 'rxjs';
import { AxiosResponse } from 'axios';

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

const hn_endpoint = 'https://hn.algolia.com/api/v1/search_by_date?query=nodejs';

const mockConfig = registerAs('config', () => {
  return {
    postgres_url: '',
    hn_endpoint,
  };
});

const mockResponse: HNResponse = {
  hitsPerPage: 1,
  hits: [
    {
      author: 'test',
      title: 'test',
      created_at: 'test',
      updated_at: 'test',
      story_id: 1,
      story_title: 'test',
      story_url: 'test',
      story_text: 'test',
      comment_text: 'test',
      url: '',
      _tags: [''],
    },
  ],
};

const MockAxiosResponse = {
  data: mockResponse,
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
} as unknown as AxiosResponse;

describe('TasksService', () => {
  let service: TasksService;
  let httpService: HttpService;
  let storyRepo: Repository<Story>;
  let deletedStoriesRepo: Repository<DeletedStories>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Story),
          useValue: {
            find: jest.fn(),
            findOneBy: jest.fn(),
            save: jest.fn(),
            remove: jest.fn(),
            delete: jest.fn(),
            create: jest.fn().mockReturnValue(mockStory),
          },
        },
        {
          provide: getRepositoryToken(DeletedStories),
          useValue: {
            find: jest.fn(),
            findOneBy: jest.fn(),
            save: jest.fn(),
            remove: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
      imports: [
        HttpModule,
        ScheduleModule.forRoot(),
        ConfigModule.forRoot({
          load: [mockConfig],
          isGlobal: true,
        }),
      ],
    }).compile();

    httpService = module.get<HttpService>(HttpService);
    service = module.get<TasksService>(TasksService);
    storyRepo = module.get<Repository<Story>>(getRepositoryToken(Story));
    deletedStoriesRepo = module.get<Repository<DeletedStories>>(
      getRepositoryToken(DeletedStories),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('insertNews', () => {
    it('should insert news', async () => {
      // arrange
      const spyDeletedStoriesRepo = jest
        .spyOn(deletedStoriesRepo, 'find')
        .mockResolvedValue([]);

      const spyStoryRepo = jest
        .spyOn(storyRepo, 'save')
        .mockResolvedValue(mockStory);
      // act
      await service.insertNews(mockResponse);
      // assert
      expect(spyDeletedStoriesRepo).toHaveBeenCalled();
      expect(spyStoryRepo).toHaveBeenCalled();
    });
  });

  describe('makeRequest', () => {
    it('make request', async () => {
      // arrange
      const httpSpy = jest
        .spyOn(httpService, 'get')
        .mockReturnValue(of(MockAxiosResponse));

      const serviceSpy = jest
        .spyOn(service, 'insertNews')
        .mockResolvedValue([mockStory]);
      // act
      await service.makeRequest();
      // assert
      expect(httpSpy).toHaveBeenCalled();
      expect(httpSpy).toHaveBeenCalledWith(hn_endpoint);
      expect(serviceSpy).toHaveBeenCalled();
    });
  });
});
