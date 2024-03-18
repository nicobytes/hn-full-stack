import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Story } from '@database/entities/story.entity';
import { DeletedStories } from '@database/entities/deleted.entity';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(Story)
    private readonly newsRepo: Repository<Story>,
    @InjectRepository(DeletedStories)
    private readonly deletedStoryRepo: Repository<DeletedStories>,
  ) {}

  getAll() {
    return this.newsRepo.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  findById(id: number) {
    return this.newsRepo.findOneByOrFail({ id });
  }

  async deleteStory(storyId: Story['id']) {
    const story = await this.findById(storyId);
    const deletedStory = this.deletedStoryRepo.create({ storyId: story.id });
    await this.deletedStoryRepo.save(deletedStory);
    return await this.newsRepo.delete({ id: story.id });
  }
}
