import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { EnvConfig } from './common/config/env.config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const envConfig = app.get(EnvConfig);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.use(cookieParser());

  const logger = new Logger(AppModule.name);
  const PORT = envConfig.getEnv('PORT') || 3330;

  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('BookRack API')
    .setDescription('API documentation for the BookRack system')
    .setVersion('1.0')
    .addCookieAuth('Authentication')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(PORT);

  logger.log({
    message: 'Application is running',
    url: `http://localhost:${PORT}`,
    env: envConfig.getEnv('NODE_ENV'),
    port: PORT,
    db: envConfig.getEnv('MONGODB_URI'),
    api: `http://localhost:${PORT}/api-docs`,
  });
}
bootstrap();
