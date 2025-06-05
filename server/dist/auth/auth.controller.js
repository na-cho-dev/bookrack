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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const creat_user_dto_1 = require("../user/dto/creat-user.dto");
const local_auth_guard_1 = require("../guards/local-auth.guard");
const current_user_decorator_1 = require("../decorators/current-user.decorator");
const jwt_refresh_auth_guard_1 = require("../guards/jwt-refresh-auth.guard");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
const login_dto_1 = require("./dto/login.dto");
const create_admin_dto_1 = require("../user/dto/create-admin.dto");
const membership_service_1 = require("../membership/membership.service");
let AuthController = class AuthController {
    authService;
    membershipService;
    constructor(authService, membershipService) {
        this.authService = authService;
        this.membershipService = membershipService;
    }
    async registerAdmin(adminDto, response) {
        const user = await this.authService.registerAdmin(adminDto);
        await this.authService.login(user, response);
        response.json({
            message: 'Account Created Successfully',
            user,
        });
    }
    async registerUser(userDto, response) {
        const user = await this.authService.registerUser(userDto);
        await this.authService.login(user, response);
        response.json({
            message: 'Account Created Successfully',
            user,
        });
    }
    async login(user, response) {
        const userResponse = await this.authService.login(user, response);
        response.json({
            message: 'Login successful',
            user: userResponse,
        });
    }
    async getCurrentUser(user, orgId) {
        return await this.authService.getCurrentUser(user, orgId);
    }
    async refreshToken(user, response) {
        const refreshedUser = await this.authService.refreshToken(user, response);
        response.json({
            message: 'Token Refreshed',
            refreshedUser,
        });
    }
    async logout(user, response) {
        await this.authService.logout(user, response);
        response.json({
            message: 'User logged out successfully',
        });
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, swagger_1.ApiBody)({ type: create_admin_dto_1.CreateAdminDto }),
    (0, common_1.Post)('admin/register'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_admin_dto_1.CreateAdminDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerAdmin", null);
__decorate([
    (0, swagger_1.ApiBody)({ type: creat_user_dto_1.CreateUserDto }),
    (0, common_1.Post)('user/register'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [creat_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerUser", null);
__decorate([
    (0, swagger_1.ApiBody)({ type: login_dto_1.LoginDto }),
    (0, common_1.Post)('login'),
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, swagger_1.ApiCookieAuth)('Authentication'),
    (0, common_1.Get)('current-user'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JWTAuthGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Headers)('x-organization-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getCurrentUser", null);
__decorate([
    (0, swagger_1.ApiCookieAuth)('Refresh'),
    (0, common_1.Get)('refresh'),
    (0, common_1.UseGuards)(jwt_refresh_auth_guard_1.JWTRefreshAuthGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
__decorate([
    (0, swagger_1.ApiCookieAuth)('Authentication'),
    (0, common_1.Get)('logout'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JWTAuthGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        membership_service_1.MembershipService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map