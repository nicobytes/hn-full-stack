import { Injectable, Logger, Inject } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';
import { ConfigType } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Story } from '@database/entities/story.entity';
import { DeletedStories } from '@database/entities/deleted.entity';
import config from '@src/config';

interface Hit {
  author: string;
  title: string;
  created_at: string;
  updated_at: string;
  story_id: number;
  story_title: string;
  story_url: string;
  story_text: string;
  comment_text: string;
  url: string;
  _tags: string[];
}

export interface HNResponse {
  hitsPerPage: number;
  hits: Hit[];
}

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    private http: HttpService,
    @InjectRepository(Story)
    private readonly storyRepo: Repository<Story>,
    @InjectRepository(DeletedStories)
    private readonly deletedStoriesRepo: Repository<DeletedStories>,
    @Inject(config.KEY)
    private configService: ConfigType<typeof config>,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  makeRequest() {
    this.logger.debug('Called to API to get news');
    return new Promise((resolve) => {
      this.http.get<HNResponse>(this.configService.hn_endpoint).subscribe({
        next: async (response) => {
          const results = await this.insertNews(response.data);
          this.logger.debug(`Inserted ${results.length} news`);
          resolve(results);
        },
      });
    });
  }

  async insertNews(data: HNResponse) {
    const allBannedStories = await this.deletedStoriesRepo.find();
    const allBannedStoriesIds = allBannedStories.map((story) => story.storyId);
    const stories = data.hits
      .filter((hit) => {
        return (
          (hit.story_title || hit.title) &&
          !allBannedStoriesIds.includes(hit.story_id)
        );
      })
      .map((hit) => {
        return this.storyRepo.create({
          id: hit.story_id,
          title: hit.story_title ?? hit.title,
          text: hit.story_text ?? hit.comment_text,
          url: this.getUrl(hit),
          author: hit.author,
          createdAt: new Date(hit.created_at),
          updatedAt: new Date(hit.updated_at),
        });
      })
      .reduce<Story[]>((stories, story) => {
        if (!stories.find((s) => s.id === story.id)) {
          stories.push(story);
        }
        return stories;
      }, []);
    return this.storyRepo.save(stories);
  }

  private getUrl(hit: Hit) {
    const url = hit.story_url ?? hit.url;
    if (url) {
      return url;
    }
    return `https://news.ycombinator.com/item?id=${hit.story_id}`;
  }
}
