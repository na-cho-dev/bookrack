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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const bcrypt_1 = require("bcrypt");
const env_config_1 = require("../common/config/env.config");
const jwt_cookie_utils_1 = require("../common/utils/jwt-cookie.utils");
let AuthService = class AuthService {
    envConfig;
    userService;
    jwtCookieService;
    constructor(envConfig, userService, jwtCookieService) {
        this.envConfig = envConfig;
        this.userService = userService;
        this.jwtCookieService = jwtCookieService;
    }
    async validateUser(email, password) {
        const user = await this.userService.getUser({ email }, true);
        if (user && (await (0, bcrypt_1.compare)(password, user.password))) {
            const { password, ...secureUser } = user.toObject();
            return secureUser;
        }
        return null;
    }
    async verifyUserRefreshToken(token, userId) {
        try {
            const user = await this.userService.getUser({ _id: userId }, false, true);
            const authenticated = await (0, bcrypt_1.compare)(token, user.refreshToken);
            if (!authenticated) {
                throw new common_1.NotFoundException('Refresh token not found');
            }
            const { refreshToken, ...secureUser } = user.toObject();
            return secureUser;
        }
        catch (error) {
            throw new common_1.BadRequestException('Refresh Token Error');
        }
    }
    async register(userDto) {
        return await this.userService.create(userDto);
    }
    async login(user, response) {
        const payload = { sub: String(user._id), email: user.email };
        const accessToken = await this.jwtCookieService.signToken(payload, 'access');
        const refreshToken = await this.jwtCookieService.signToken(payload, 'refresh');
        await this.userService.updateUser({ _id: user._id }, { refreshToken: await (0, bcrypt_1.hash)(refreshToken, 10) });
        this.jwtCookieService.setAuthCookie(response, accessToken, 'access');
        this.jwtCookieService.setAuthCookie(response, refreshToken, 'refresh');
        return user;
    }
    async refreshToken(user, response) {
        const payload = { sub: String(user._id), email: user.email };
        const accessToken = await this.jwtCookieService.signToken(payload, 'access');
        this.jwtCookieService.setAuthCookie(response, accessToken, 'access');
        return user;
    }
    async logout(user, response) {
        await this.userService.updateUser({ _id: user._id }, { refreshToken: null });
        return this.jwtCookieService.clearAuthCookie(response);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [env_config_1.EnvConfig,
        user_service_1.UserService,
        jwt_cookie_utils_1.JWTCookieUtil])
], AuthService);
//# sourceMappingURL=auth.service.js.map