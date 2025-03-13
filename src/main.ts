import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './core/infra/http/filters/http-exception.filter';
import { EnvService } from './core/infra/config/env/env.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpExceptionFilter());

  const envService = app.get(EnvService);
  const port = envService.get('PORT');

  await app.listen(port);
}

bootstrap();
