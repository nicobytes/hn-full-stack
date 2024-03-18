import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { TasksService } from '@tasks/tasks.service';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.enableCors({
    origin: '*',
  });

  const config = new DocumentBuilder()
    .setTitle('News API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const tasks = app.get(TasksService);
  tasks.makeRequest();

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
