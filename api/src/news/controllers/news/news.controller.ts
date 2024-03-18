import { Controller, Delete, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { NewsService } from '@news/services/news/news.service';

@ApiTags('news')
@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Get()
  getAll() {
    return this.newsService.getAll();
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.newsService.deleteStory(id);
  }
}
