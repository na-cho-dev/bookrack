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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt_1 = require("bcrypt");
const validate_objectid_utils_1 = require("../common/utils/validate-objectid.utils");
const user_schema_1 = require("./schemas/user.schema");
const organization_service_1 = require("../organization/organization.service");
const membership_service_1 = require("../membership/membership.service");
const membership_schema_1 = require("../membership/schemas/membership.schema");
let UserService = class UserService {
    userModel;
    organizationService;
    membershipService;
    constructor(userModel, organizationService, membershipService) {
        this.userModel = userModel;
        this.organizationService = organizationService;
        this.membershipService = membershipService;
    }
    async getUser(query, selectPassword = false, selectRefreshToken = false) {
        const selectFields = [
            selectPassword ? '+password' : '-password',
            selectRefreshToken ? '+refreshToken' : '-refreshToken',
        ].join(' ');
        const user = await this.userModel.findOne(query).select(selectFields);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async createAdmin(adminDto) {
        const email = adminDto.email.toLowerCase();
        let user = await this.userModel.findOne({ email });
        if (!user) {
            user = await this.userModel.create({
                email,
                name: adminDto.name,
                password: await (0, bcrypt_1.hash)(adminDto.password, 10),
            });
        }
        const organization = await this.organizationService.createOrganization({
            name: adminDto.organizationName,
            description: adminDto.organizationDescription,
            owner: email,
        });
        await this.membershipService.createMembership(String(user._id), String(organization._id), membership_schema_1.MembershipRole.ADMIN);
        const memberships = await this.membershipService.findAllByUserId(String(user._id));
        const userResponse = {
            _id: String(user._id),
            email: user.email,
            name: user.name,
            memberships,
        };
        return userResponse;
    }
    async createUser(userDto) {
        const email = userDto.email.toLowerCase();
        let user = await this.userModel.findOne({ email });
        if (!user) {
            user = new this.userModel({
                email,
                name: userDto.name,
                password: await (0, bcrypt_1.hash)(userDto.password, 10),
            });
            user = await user.save();
        }
        const organization = await this.organizationService.findOne({
            code: userDto.organizationCode,
        });
        if (!organization) {
            throw new common_1.NotFoundException('Organization not found.');
        }
        const existingMembership = await this.membershipService.findOne({
            user: user._id,
            organization: organization._id,
        });
        if (existingMembership) {
            throw new common_1.ConflictException('User is already a member of this organization.');
        }
        await this.membershipService.createMembership(String(user._id), String(organization._id), membership_schema_1.MembershipRole.USER);
        const memberships = await this.membershipService.findAllByUserId(String(user._id));
        const userResponse = {
            _id: String(user._id),
            email: user.email,
            name: user.name,
            memberships,
        };
        return userResponse;
    }
    async getUserById(id) {
        (0, validate_objectid_utils_1.validateObjectId)(id);
        const user = await this.userModel.findById(id);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async getAllUsers() {
        const users = await this.userModel.find();
        if (!users || users.length === 0) {
            throw new common_1.NotFoundException('No users found');
        }
        return users;
    }
    async updateUser(query, updateData) {
        const user = await this.userModel.findOneAndUpdate(query, updateData, {
            new: true,
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async deleteUser(id) {
        (0, validate_objectid_utils_1.validateObjectId)(id);
        const user = await this.userModel.findByIdAndDelete(id);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        organization_service_1.OrganizationService,
        membership_service_1.MembershipService])
], UserService);
//# sourceMappingURL=user.service.js.map