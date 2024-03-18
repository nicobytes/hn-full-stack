import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './tasks.service';

@Module({
  imports: [ScheduleModule.forRoot(), HttpModule],
  providers: [TasksService],
})
export class TasksModule {}
