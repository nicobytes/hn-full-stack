import { Module } from '@nestjs/common';
import { NewsService } from './services/news/news.service';
import { NewsController } from './controllers/news/news.controller';

@Module({
  providers: [NewsService],
  controllers: [NewsController],
  exports: [NewsService],
})
export class NewsModule {}
