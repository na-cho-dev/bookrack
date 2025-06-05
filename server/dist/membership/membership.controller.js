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
exports.MembershipController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
const membership_guard_1 = require("../guards/membership.guard");
const membership_role_guard_1 = require("../guards/membership-role.guard");
const membership_schema_1 = require("./schemas/membership.schema");
const membership_decorator_1 = require("../decorators/membership.decorator");
const membership_service_1 = require("./membership.service");
const membership_role_decorator_1 = require("../decorators/membership-role.decorator");
let MembershipController = class MembershipController {
    membershipService;
    constructor(membershipService) {
        this.membershipService = membershipService;
    }
    getAllMemberships() {
        return this.membershipService.findAllMemberships();
    }
    getUsersByOrganization(membership) {
        const orgId = membership.organization._id;
        return this.membershipService.findUsersByOrganization(String(orgId));
    }
    async updateMemberRole(adminMembership, membershipId, role) {
        return this.membershipService.updateMemberRole(adminMembership, membershipId, role);
    }
};
exports.MembershipController = MembershipController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JWTAuthGuard, membership_guard_1.MembershipGuard, membership_role_guard_1.MembershipRoleGuard),
    (0, membership_role_decorator_1.MembershipRoles)(membership_schema_1.MembershipRole.ADMIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MembershipController.prototype, "getAllMemberships", null);
__decorate([
    (0, common_1.Get)('organization/users'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JWTAuthGuard, membership_guard_1.MembershipGuard, membership_role_guard_1.MembershipRoleGuard),
    (0, membership_role_decorator_1.MembershipRoles)(membership_schema_1.MembershipRole.ADMIN),
    __param(0, (0, membership_decorator_1.Membership)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MembershipController.prototype, "getUsersByOrganization", null);
__decorate([
    (0, common_1.Patch)(':id/role'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JWTAuthGuard, membership_guard_1.MembershipGuard, membership_role_guard_1.MembershipRoleGuard),
    (0, membership_role_decorator_1.MembershipRoles)(membership_schema_1.MembershipRole.ADMIN),
    __param(0, (0, membership_decorator_1.Membership)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], MembershipController.prototype, "updateMemberRole", null);
exports.MembershipController = MembershipController = __decorate([
    (0, common_1.Controller)('membership'),
    __metadata("design:paramtypes", [membership_service_1.MembershipService])
], MembershipController);
//# sourceMappingURL=membership.controller.js.map