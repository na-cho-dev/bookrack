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
exports.OrganizationController = void 0;
const common_1 = require("@nestjs/common");
const organization_service_1 = require("./organization.service");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
const membership_decorator_1 = require("../decorators/membership.decorator");
const membership_schema_1 = require("../membership/schemas/membership.schema");
const search_organization_dto_1 = require("./dto/search-organization.dto");
const membership_role_decorator_1 = require("../decorators/membership-role.decorator");
const membership_guard_1 = require("../guards/membership.guard");
const membership_role_guard_1 = require("../guards/membership-role.guard");
let OrganizationController = class OrganizationController {
    organizationService;
    constructor(organizationService) {
        this.organizationService = organizationService;
    }
    async getAllOrgs() {
        return this.organizationService.getAllOrgs();
    }
    async getOrgByCode(code) {
        return this.organizationService.getOrgByCode(code);
    }
    async searchOrganizations(filters) {
        return this.organizationService.searchOrganizations(filters);
    }
    async updateOrganization(membership, updateData) {
        const orgId = membership.organization._id;
        return this.organizationService.updateOrganization(String(orgId), updateData);
    }
    async deleteOrganization(membership) {
        const orgId = membership.organization._id;
        return this.organizationService.deleteOrganization(String(orgId));
    }
    async getOrganizationById(id) {
        return this.organizationService.getOrgById(id);
    }
};
exports.OrganizationController = OrganizationController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "getAllOrgs", null);
__decorate([
    (0, common_1.Get)('code/:code'),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "getOrgByCode", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_organization_dto_1.SearchOrganizationDto]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "searchOrganizations", null);
__decorate([
    (0, common_1.Patch)('update'),
    (0, common_1.UseGuards)(membership_guard_1.MembershipGuard, membership_role_guard_1.MembershipRoleGuard),
    (0, membership_role_decorator_1.MembershipRoles)(membership_schema_1.MembershipRole.ADMIN),
    __param(0, (0, membership_decorator_1.Membership)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "updateOrganization", null);
__decorate([
    (0, common_1.Delete)('delete'),
    (0, common_1.UseGuards)(membership_guard_1.MembershipGuard, membership_role_guard_1.MembershipRoleGuard),
    (0, membership_role_decorator_1.MembershipRoles)(membership_schema_1.MembershipRole.ADMIN),
    __param(0, (0, membership_decorator_1.Membership)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "deleteOrganization", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "getOrganizationById", null);
exports.OrganizationController = OrganizationController = __decorate([
    (0, common_1.Controller)('organization'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JWTAuthGuard),
    __metadata("design:paramtypes", [organization_service_1.OrganizationService])
], OrganizationController);
//# sourceMappingURL=organization.controller.js.map