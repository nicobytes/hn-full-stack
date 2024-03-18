import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { DatabaseModule } from './database/database.module';
import { HealthModule } from './health/health.module';
import { TasksModule } from './tasks/tasks.module';
import { NewsModule } from './news/news.module';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        POSTGRES_URL: Joi.string().required(),
        HN_ENDPOINT: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    HealthModule,
    TasksModule,
    NewsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
