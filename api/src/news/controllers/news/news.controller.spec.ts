import { Test, TestingModule } from '@nestjs/testing';
import { NewsController } from './news.controller';
import { NewsService } from '@news/services/news/news.service';

describe('NewsController', () => {
  let controller: NewsController;
  let newsService: NewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: NewsService,
          useValue: {
            getAll: jest.fn(),
            deleteStory: jest.fn(),
          },
        },
      ],
      controllers: [NewsController],
    }).compile();

    controller = module.get<NewsController>(NewsController);
    newsService = module.get<NewsService>(NewsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array', async () => {
    // arrange
    const getAllSpy = jest.spyOn(newsService, 'getAll').mockResolvedValue([]);
    // act
    const data = await controller.getAll();
    // assert
    expect(data.length).toEqual(0);
    expect(getAllSpy).toHaveBeenCalled();
  });
});
