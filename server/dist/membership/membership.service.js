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
exports.MembershipService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const membership_schema_1 = require("./schemas/membership.schema");
const mongoose_2 = require("mongoose");
const user_service_1 = require("../user/user.service");
const validate_objectid_utils_1 = require("../common/utils/validate-objectid.utils");
const organization_service_1 = require("../organization/organization.service");
let MembershipService = class MembershipService {
    membershipModel;
    userService;
    organizationService;
    constructor(membershipModel, userService, organizationService) {
        this.membershipModel = membershipModel;
        this.userService = userService;
        this.organizationService = organizationService;
    }
    async createMembership(userId, organizationId, role) {
        const existing = await this.membershipModel.findOne({
            user: userId,
            organization: organizationId,
        });
        if (existing) {
            throw new common_1.ConflictException('User already part of this organization');
        }
        const user = await this.userService.getUserById(userId);
        return this.membershipModel.create({
            user: userId,
            organization: organizationId,
            role,
        });
    }
    async joinOrganization(userId, organizationCode) {
        const org = await this.organizationService.findOne({
            code: organizationCode,
        });
        if (!org) {
            throw new common_1.NotFoundException('Organization not found with provided code');
        }
        const existing = await this.membershipModel.findOne({
            user: String(userId),
            organization: String(org._id),
        });
        if (existing) {
            throw new common_1.BadRequestException('You are already a member of this organization');
        }
        const membership = await this.membershipModel.create({
            user: String(userId),
            organization: String(org._id),
            role: 'user',
            status: 'pending',
        });
        if (!membership) {
            throw new common_1.ConflictException('Failed to join organization');
        }
        await membership.populate('user', '-password -refreshToken');
        await membership.populate('organization');
        return membership;
    }
    async findOne(query) {
        const membership = await this.membershipModel
            .findOne(query)
            .populate('user', '-password -refreshToken')
            .populate('organization');
        if (!membership)
            return null;
        return membership;
    }
    async findAllByUserId(userId) {
        (0, validate_objectid_utils_1.validateObjectId)(userId);
        const memberships = await this.membershipModel
            .find({ user: userId })
            .populate('user', '-password -refreshToken')
            .populate('organization');
        if (!memberships || memberships.length === 0)
            return [];
        return memberships;
    }
    async findUsersByOrganization(orgId) {
        (0, validate_objectid_utils_1.validateObjectId)(orgId);
        return this.membershipModel
            .find({ organization: orgId })
            .populate('user', '-password -refreshToken')
            .populate('organization');
    }
    async findByUserAndOrganization(userId, organizationId) {
        (0, validate_objectid_utils_1.validateObjectId)(userId);
        (0, validate_objectid_utils_1.validateObjectId)(organizationId);
        const membership = await this.membershipModel
            .findOne({ user: userId, organization: organizationId })
            .populate('user', '-password -refreshToken')
            .populate('organization');
        if (!membership) {
            return null;
        }
        return membership;
    }
    async findAllMemberships() {
        const memberships = await this.membershipModel
            .find()
            .populate('user', '-password -refreshToken')
            .populate('organization');
        if (!memberships || memberships.length === 0) {
            return [];
        }
        return memberships;
    }
    async updateMemberRole(adminMembership, membershipId, role) {
        (0, validate_objectid_utils_1.validateObjectId)(membershipId);
        const membership = await this.membershipModel.findById(membershipId);
        if (!membership)
            throw new common_1.NotFoundException('Membership not found');
        if (membership.organization.toString() !==
            adminMembership.organization._id.toString()) {
            throw new common_1.ForbiddenException('Cannot update member outside your organization');
        }
        if (String(membership._id) === String(adminMembership._id)) {
            throw new common_1.ForbiddenException('You cannot update your own role');
        }
        membership.role = role;
        await membership.save();
        return membership;
    }
    async leaveOrganization(userId, orgId) {
        (0, validate_objectid_utils_1.validateObjectId)(userId);
        (0, validate_objectid_utils_1.validateObjectId)(orgId);
        const membership = await this.membershipModel.findOneAndDelete({
            user: userId,
            organization: orgId,
        });
        if (!membership) {
            throw new common_1.NotFoundException('Membership not found');
        }
    }
};
exports.MembershipService = MembershipService;
exports.MembershipService = MembershipService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(membership_schema_1.Membership.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => user_service_1.UserService))),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => organization_service_1.OrganizationService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        user_service_1.UserService,
        organization_service_1.OrganizationService])
], MembershipService);
//# sourceMappingURL=membership.service.js.map