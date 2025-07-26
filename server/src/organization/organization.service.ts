import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Organization,
  OrganizationDocument,
} from './schemas/organization.shema';
import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { customAlphabet } from 'nanoid';
import { MembershipService } from 'src/membership/membership.service';
import {
  MembershipDocument,
  MembershipRole,
} from 'src/membership/schemas/membership.schema';
import { SearchOrganizationDto } from './dto/search-organization.dto';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectModel(Organization.name)
    private readonly organizationModel: Model<OrganizationDocument>,
    private readonly membershipService: MembershipService,
  ) {}

  private nanoid = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6);

  getOrgPrefix = (name: string): string => {
    const words = name.trim().split(/\s+/).filter(Boolean);
    if (words.length === 1) {
      // Single word: first 3 letters
      return words[0].slice(0, 3).toUpperCase();
    }
    // More than 1 word: first letter of each word
    return words.map((w) => w[0].toUpperCase()).join('');
  };

  async generateUniqueOrgCode(name: string): Promise<string> {
    const prefix = this.getOrgPrefix(name);
    let code: string;
    let exists = true;

    do {
      code = `${prefix}-${this.nanoid()}`;
      exists = !!(await this.organizationModel.exists({ code }));
    } while (exists);

    return code;
  }

  async createOrganization(
    organizationDto: CreateOrganizationDto,
    userId: string,
  ): Promise<OrganizationDocument> {
    const newOrg = new this.organizationModel(organizationDto);

    newOrg.owner = new Types.ObjectId(userId);
    if (!newOrg.owner) throw new NotFoundException('Owner not found');

    newOrg.code = await this.generateUniqueOrgCode(organizationDto.name);
    const savedOrganization = await newOrg.save();

    // Create Membership to Orgganization
    await this.membershipService.createMembership(
      String(userId),
      String(savedOrganization._id),
      MembershipRole.ADMIN,
      'active', // Default status when creating an organization
    );

    return savedOrganization;
  }

  async findOne(
    query: FilterQuery<Organization>,
  ): Promise<OrganizationDocument | null> {
    return this.organizationModel.findOne(query);
  }

  async searchOrganizations(
    filters: SearchOrganizationDto,
  ): Promise<OrganizationDocument[]> {
    const query: FilterQuery<Organization> = {};
    if (filters.name) {
      query.name = { $regex: filters.name, $options: 'i' };
    }
    if (filters.code) {
      query.code = { $regex: filters.code, $options: 'i' };
    }
    if (filters.owner) {
      query.owner = { $regex: filters.owner, $options: 'i' };
    }
    const orgs = await this.organizationModel
      .find(query)
      .sort({ owner: -1 })
      .populate('owner', 'email');
    if (!orgs || orgs.length === 0) {
      throw new NotFoundException(
        'No organizations found matching the criteria',
      );
    }
    return orgs;
  }

  async getOrgById(id: string): Promise<OrganizationDocument | null> {
    return this.organizationModel.findById(id).populate('owner', 'email');
  }

  async getOrgByCode(code: string): Promise<OrganizationDocument | null> {
    const org = await this.organizationModel
      .findOne({ code })
      .populate('owner', 'email');
    if (!org) throw new NotFoundException('Organization not found');

    return org;
  }

  async getAllOrgs(): Promise<OrganizationDocument[]> {
    const orgs = await this.organizationModel
      .find()
      .sort({ createdAt: -1 })
      .populate('owner', 'email');
    if (!orgs || orgs.length === 0)
      throw new NotFoundException('No organizations found');

    return orgs;
  }

  async updateOrganization(
    id: string,
    updateData: UpdateQuery<CreateOrganizationDto>,
  ): Promise<OrganizationDocument | null> {
    const organization = await this.organizationModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .populate('owner', 'email');
    if (!organization) throw new NotFoundException('Organization not found');

    return organization;
  }

  async deleteOrganization(id: string): Promise<OrganizationDocument | null> {
    const organization = await this.organizationModel.findByIdAndDelete(id);
    if (!organization) throw new NotFoundException('Organization not found');

    return organization;
  }
}
