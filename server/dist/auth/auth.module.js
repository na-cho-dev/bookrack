"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const user_module_1 = require("../user/user.module");
const local_auth_strategy_1 = require("./strategy/local-auth.strategy");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const jwt_auth_strategy_1 = require("./strategy/jwt-auth.strategy");
const env_config_1 = require("../common/config/env.config");
const jwt_cookie_utils_1 = require("../common/utils/jwt-cookie.utils");
const jwt_refresh_auth_strategy_1 = require("./strategy/jwt-refresh-auth.strategy");
const membership_module_1 = require("../membership/membership.module");
const organization_module_1 = require("../organization/organization.module");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            passport_1.PassportModule,
            jwt_1.JwtModule,
            membership_module_1.MembershipModule,
            organization_module_1.OrganizationModule,
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            auth_service_1.AuthService,
            local_auth_strategy_1.LocalAuthStrategy,
            jwt_auth_strategy_1.JWTAuthStrategy,
            jwt_refresh_auth_strategy_1.JWTRefreshAuthStrategy,
            env_config_1.EnvConfig,
            jwt_cookie_utils_1.JWTCookieUtil,
        ],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map