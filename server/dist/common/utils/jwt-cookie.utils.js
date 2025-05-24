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
exports.JWTCookieUtil = void 0;
const jwt_1 = require("@nestjs/jwt");
const env_config_1 = require("../config/env.config");
const common_1 = require("@nestjs/common");
let JWTCookieUtil = class JWTCookieUtil {
    envConfig;
    jwtService;
    constructor(envConfig, jwtService) {
        this.envConfig = envConfig;
        this.jwtService = jwtService;
    }
    cookieOptions(maxAge) {
        return {
            httpOnly: true,
            secure: this.envConfig.getEnv('NODE_ENV') === 'production',
            sameSite: 'strict',
            maxAge,
        };
    }
    async signToken(payload, type = 'access') {
        const secret = type === 'access'
            ? this.envConfig.getEnv('JWT_ACCESS_TOKEN_SECRET')
            : this.envConfig.getEnv('JWT_REFRESH_TOKEN_SECRET');
        const expiresIn = type === 'access'
            ? `${this.envConfig.getEnv('JWT_ACCESS_TOKEN_EXPIRATION_MS')}ms`
            : `${this.envConfig.getEnv('JWT_REFRESH_TOKEN_EXPIRATION_MS')}ms`;
        return await this.jwtService.signAsync(payload, {
            secret,
            expiresIn,
        });
    }
    setAuthCookie(res, token, type = 'access') {
        const cookieType = type === 'access' ? 'Authentication' : 'Refresh';
        const maxAge = type === 'access'
            ? parseInt(this.envConfig.getEnv('JWT_ACCESS_TOKEN_EXPIRATION_MS'))
            : parseInt(this.envConfig.getEnv('JWT_REFRESH_TOKEN_EXPIRATION_MS'));
        res.cookie(cookieType, token, this.cookieOptions(maxAge));
    }
    clearAuthCookie(res) {
        res
            .clearCookie('Authentication', this.cookieOptions())
            .clearCookie('Refresh', this.cookieOptions());
    }
};
exports.JWTCookieUtil = JWTCookieUtil;
exports.JWTCookieUtil = JWTCookieUtil = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [env_config_1.EnvConfig,
        jwt_1.JwtService])
], JWTCookieUtil);
//# sourceMappingURL=jwt-cookie.utils.js.map