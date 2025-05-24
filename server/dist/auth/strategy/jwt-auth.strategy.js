"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTAuthStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const user_service_1 = require("../../user/user.service");
const common_1 = require("@nestjs/common");
const env_config_1 = require("../../common/config/env.config");
let JWTAuthStrategy = class JWTAuthStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    userService;
    constructor(envConfig, userService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([
                (req) => req.cookies.Authentication,
            ]),
            secretOrKey: envConfig.getEnv('JWT_ACCESS_TOKEN_SECRET'),
        });
        this.userService = userService;
    }
    async validate(payload) {
        const user = this.userService.getUser({ _id: payload.sub });
        if (!user) {
            throw new common_1.UnauthorizedException('Permission Denied');
        }
        return user;
    }
};
exports.JWTAuthStrategy = JWTAuthStrategy;
exports.JWTAuthStrategy = JWTAuthStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [env_config_1.EnvConfig,
        user_service_1.UserService])
], JWTAuthStrategy);
//# sourceMappingURL=jwt-auth.strategy.js.map