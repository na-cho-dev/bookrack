"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./auth/auth.module");
const mongoose_1 = require("@nestjs/mongoose");
const user_module_1 = require("./user/user.module");
const env_config_1 = require("./common/config/env.config");
const book_module_1 = require("./book/book.module");
const borrow_book_module_1 = require("./borrow-book/borrow-book.module");
const organization_module_1 = require("./organization/organization.module");
const membership_module_1 = require("./membership/membership.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: ['.env'],
                ignoreEnvFile: false,
                cache: true,
            }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    uri: configService.get('MONGODB_URI'),
                }),
            }),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            book_module_1.BookModule,
            borrow_book_module_1.BorrowBookModule,
            organization_module_1.OrganizationModule,
            membership_module_1.MembershipModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, env_config_1.EnvConfig],
        exports: [env_config_1.EnvConfig],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map