import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { EnvConfig } from './common/config/env.config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const envConfig = app.get(EnvConfig);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  // app.useGlobalFilters()
  app.use(cookieParser());
  app.enableCors({
    origin: envConfig.getEnv('CLIENT_URL', 'http://localhost:4400'),
    credentials: true,
  });
  app.setGlobalPrefix('api');

  // Info endpoint for '/'
  app.getHttpAdapter().get('/', (req, res) => {
    res.json({
      name: 'BookRack API',
      description: 'API for BookRack library management system',
      version: '1.0',
      docs: '/api-docs',
      health: '/api/health',
    });
  });

  const logger = new Logger(AppModule.name);
  const PORT = envConfig.getEnv('PORT', '3330');

  // if (envConfig.getEnv('NODE_ENV') === 'development') {
  //   const config = new DocumentBuilder()
  //     .setTitle('BookRack API')
  //     .setDescription('API documentation for the BookRack System')
  //     .setVersion('1.0')
  //     .addCookieAuth('Authentication')
  //     .build();

  //   const document = SwaggerModule.createDocument(app, config);
  //   SwaggerModule.setup('api-docs', app, document);
  // }

  const config = new DocumentBuilder()
    .setTitle('BookRack API')
    .setDescription('API documentation for the BookRack System')
    .setVersion('1.0')
    .addCookieAuth('Authentication')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  const isProd = envConfig.getEnv('NODE_ENV') === 'production';
  await app.listen(PORT, isProd ? '0.0.0.0' : 'localhost');
  const appUrl = await app.getUrl();

  logger.log({
    message: 'Application is running',
    url: `${appUrl}/api`,
    env: envConfig.getEnv('NODE_ENV'),
    port: PORT,
    db: envConfig.getEnv('MONGODB_URI'),
    apiDocs: `${appUrl}/api-docs`,
    health: `${appUrl}/api/health`,
  });
}

bootstrap();
