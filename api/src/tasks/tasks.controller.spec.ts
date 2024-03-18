import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from '@tasks/tasks.service';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: TasksService,
          useValue: {
            makeRequest: jest.fn(),
          },
        },
      ],
      controllers: [TasksController],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array', async () => {
    // arrange
    const makeRequestSpy = jest
      .spyOn(service, 'makeRequest')
      .mockResolvedValue([]);
    // act
    await controller.makeRequest();
    expect(makeRequestSpy).toHaveBeenCalled();
  });
});
