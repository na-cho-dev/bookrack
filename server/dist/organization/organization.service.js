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
exports.OrganizationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const organization_shema_1 = require("./schemas/organization.shema");
const mongoose_2 = require("mongoose");
const nanoid_1 = require("nanoid");
const membership_service_1 = require("../membership/membership.service");
let OrganizationService = class OrganizationService {
    organizationModel;
    membershipService;
    constructor(organizationModel, membershipService) {
        this.organizationModel = organizationModel;
        this.membershipService = membershipService;
    }
    nanoid = (0, nanoid_1.customAlphabet)('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6);
    getOrgPrefix = (name) => {
        const words = name.trim().split(/\s+/).filter(Boolean);
        if (words.length === 1) {
            return words[0].slice(0, 3).toUpperCase();
        }
        return words.map((w) => w[0].toUpperCase()).join('');
    };
    async generateUniqueOrgCode(name) {
        const prefix = this.getOrgPrefix(name);
        let code;
        let exists = true;
        do {
            code = `${prefix}-${this.nanoid()}`;
            exists = !!(await this.organizationModel.exists({ code }));
        } while (exists);
        return code;
    }
    async createOrganization(organizationDto) {
        const newOrg = new this.organizationModel(organizationDto);
        newOrg.code = await this.generateUniqueOrgCode(organizationDto.name);
        newOrg.owner = organizationDto.owner;
        const savedOrganization = await newOrg.save();
        return savedOrganization;
    }
    async findOne(query) {
        return this.organizationModel.findOne(query);
    }
    async searchOrganizations(filters) {
        const query = {};
        if (filters.name) {
            query.name = { $regex: filters.name, $options: 'i' };
        }
        if (filters.code) {
            query.code = { $regex: filters.code, $options: 'i' };
        }
        if (filters.owner) {
            query.owner = { $regex: filters.owner, $options: 'i' };
        }
        const orgs = await this.organizationModel.find(query).sort({ owner: -1 });
        if (!orgs || orgs.length === 0) {
            throw new common_1.NotFoundException('No organizations found matching the criteria');
        }
        return orgs;
    }
    async getOrgById(id) {
        return this.organizationModel.findById(id);
    }
    async getOrgByCode(code) {
        const org = await this.organizationModel.findOne({ code });
        if (!org) {
            throw new common_1.NotFoundException('Organization not found');
        }
        return org;
    }
    async getAllOrgs() {
        const orgs = await this.organizationModel.find().sort({ createdAt: -1 });
        if (!orgs || orgs.length === 0) {
            throw new common_1.NotFoundException('No organizations found');
        }
        return orgs;
    }
    async updateOrganization(id, updateData) {
        const organization = await this.organizationModel.findByIdAndUpdate(id, updateData, { new: true });
        if (!organization) {
            throw new common_1.NotFoundException('Organization not found');
        }
        return organization;
    }
    async deleteOrganization(id) {
        const organization = await this.organizationModel.findByIdAndDelete(id);
        if (!organization) {
            throw new common_1.NotFoundException('Organization not found');
        }
        return organization;
    }
};
exports.OrganizationService = OrganizationService;
exports.OrganizationService = OrganizationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(organization_shema_1.Organization.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        membership_service_1.MembershipService])
], OrganizationService);
//# sourceMappingURL=organization.service.js.map