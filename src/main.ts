import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.use(cookieParser());

  const logger = new Logger(AppModule.name);
  const PORT = configService.get('PORT') || 3330;

  await app.listen(PORT);

  logger.log({
    message: 'Application is running',
    port: PORT,
  });
}
bootstrap();
