"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const cookieParser = require("cookie-parser");
const env_config_1 = require("./common/config/env.config");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const envConfig = app.get(env_config_1.EnvConfig);
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true }));
    app.use(cookieParser());
    app.enableCors({
        origin: envConfig.getEnv('CLIENT_URL', 'http://localhost:4400'),
        credentials: true,
    });
    app.setGlobalPrefix('api');
    const logger = new common_1.Logger(app_module_1.AppModule.name);
    const PORT = envConfig.getEnv('PORT', '3330');
    if (envConfig.getEnv('NODE_ENV') === 'development') {
        const config = new swagger_1.DocumentBuilder()
            .setTitle('BookRack API')
            .setDescription('API documentation for the BookRack System')
            .setVersion('1.0')
            .addCookieAuth('Authentication')
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup('api-docs', app, document);
    }
    const isProd = envConfig.getEnv('NODE_ENV') === 'production';
    await app.listen(PORT, isProd ? '0.0.0.0' : 'localhost');
    const appUrl = await app.getUrl();
    logger.log({
        message: 'Application is running',
        url: `${appUrl}/api`,
        env: envConfig.getEnv('NODE_ENV'),
        port: PORT,
        db: envConfig.getEnv('MONGODB_URI'),
        api: `${appUrl}/api-docs`,
        health: `${appUrl}/api/health`,
    });
}
bootstrap();
//# sourceMappingURL=main.js.map