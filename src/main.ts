import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { EnvConfig } from './common/config/env.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const envConfig = app.get(EnvConfig);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.use(cookieParser());

  const logger = new Logger(AppModule.name);
  const PORT = envConfig.getEnv('PORT') || 3330;

  await app.listen(PORT);

  logger.log({
    message: 'Application is running',
    url: `http://localhost:${PORT}`,
    env: envConfig.getEnv('NODE_ENV'),
    port: PORT,
    db: envConfig.getEnv('MONGODB_URI'),
  });
}
bootstrap();
