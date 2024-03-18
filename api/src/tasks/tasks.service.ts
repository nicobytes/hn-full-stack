import { Injectable, Logger, Inject } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';
import { ConfigType } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Story } from '@database/entities/story.entity';
import { DeletedStories } from '@database/entities/deleted.entity';
import config from '@src/config';

interface HNResponse {
  hitsPerPage: number;
  hits: Array<{
    author: string;
    title: string;
    created_at: string;
    updated_at: string;
    story_id: number;
    story_title: string;
    story_url: string;
    story_text: string;
    comment_text: string;
    _tags: string[];
  }>;
}

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    private http: HttpService,
    @InjectRepository(Story)
    private storyRepo: Repository<Story>,
    @InjectRepository(DeletedStories)
    private deletedStoriesRepo: Repository<DeletedStories>,
    @Inject(config.KEY)
    private configService: ConfigType<typeof config>,
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  handleCron() {
    this.logger.debug('Called when the current second is 10');
    this.http.get<HNResponse>(this.configService.hn_endpoint).subscribe({
      next: async (response) => {
        const results = await this.insertNews(response.data);
        this.logger.debug(`Inserted ${results.length} news`);
      },
    });
  }

  async insertNews(data: HNResponse) {
    const allBannedStories = await this.deletedStoriesRepo.find();
    const allBannedStoriesIds = allBannedStories.map((story) => story.storyId);
    const stories = data.hits
      .map((hit) => {
        return this.storyRepo.create({
          id: hit.story_id,
          title: hit.story_title ?? hit.title,
          text: hit.story_text ?? hit.comment_text,
          url: hit.story_url,
          author: hit.author,
          createdAt: new Date(hit.created_at),
          updatedAt: new Date(hit.updated_at),
        });
      })
      .filter((story) => {
        return !allBannedStoriesIds.includes(story.id);
      })
      .reduce((stories, story) => {
        if (!stories.find((s) => s.id === story.id)) {
          stories.push(story);
        }
        return stories;
      }, []);
    const results = await Promise.all(stories);
    return this.storyRepo.save(results);
  }
}
