import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { RcpCustomExceptionFilter } from './common';

async function bootstrap() {

  const logger = new Logger('Main')

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    })
  );

  app.useGlobalFilters(new RcpCustomExceptionFilter());

  await app.listen(envs.port);

  logger.log(`Server running on port ${envs.port}`);
}
bootstrap();
