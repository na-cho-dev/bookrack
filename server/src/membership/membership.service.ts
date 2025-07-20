import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Membership,
  MembershipDocument,
  MembershipRole,
} from './schemas/membership.schema';
import { FilterQuery, Model, Types } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { validateObjectId } from 'src/common/utils/validate-objectid.utils';
import { OrganizationService } from 'src/organization/organization.service';

@Injectable()
export class MembershipService {
  constructor(
    @InjectModel(Membership.name)
    private readonly membershipModel: Model<MembershipDocument>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    @Inject(forwardRef(() => OrganizationService))
    private readonly organizationService: OrganizationService,
  ) {}

  async createMembership(
    userId: string,
    organizationId: string,
    role: MembershipRole,
  ): Promise<MembershipDocument> {
    const existing = await this.membershipModel.findOne({
      user: userId,
      organization: organizationId,
    });
    if (existing) {
      throw new ConflictException('User already part of this organization');
    }

    const user = await this.userService.getUserById(userId);

    return this.membershipModel.create({
      user: userId,
      organization: organizationId,
      role,
    });
  }

  async joinOrganization(
    userId: string,
    organizationCode: string,
  ): Promise<MembershipDocument> {
    // Find the organization by code
    const org = await this.organizationService.findOne({
      code: organizationCode,
    });
    if (!org) {
      throw new NotFoundException('Organization not found with provided code');
    }

    // Prevent duplicate membership
    const existing = await this.membershipModel.findOne({
      user: String(userId),
      organization: String(org._id),
    });

    if (existing) {
      throw new BadRequestException(
        'You are already a member of this organization',
      );
    }

    // Create the membership (default role: user, status: pending or active)
    const membership = await this.membershipModel.create({
      user: String(userId),
      organization: String(org._id),
      role: 'user',
      status: 'pending', // or 'pending' if you want admin approval
    });

    if (!membership) {
      throw new ConflictException('Failed to join organization');
    }

    // Populate Membership with user and organization details
    await membership.populate('user', '-password -refreshToken');
    await membership.populate('organization');

    return membership;
  }

  async findOne(
    query: FilterQuery<Membership>,
  ): Promise<MembershipDocument | null> {
    const membership = await this.membershipModel
      .findOne(query)
      .populate('user', '-password -refreshToken')
      .populate('organization');

    if (!membership) return null;

    return membership;
  }

  async findAllByUserId(userId: string): Promise<MembershipDocument[]> {
    validateObjectId(userId);
    const memberships = await this.membershipModel
      .find({ user: userId })
      .populate('user', '-password -refreshToken')
      .populate('organization');

    if (!memberships || memberships.length === 0) return [];

    return memberships;
  }

  async findUsersByOrganization(orgId: string) {
    validateObjectId(orgId);

    return this.membershipModel
      .find({ organization: orgId })
      .populate('user', '-password -refreshToken')
      .populate('organization');
  }

  async findByUserAndOrganization(
    userId: string,
    organizationId: string,
  ): Promise<MembershipDocument | null> {
    validateObjectId(userId);
    validateObjectId(organizationId);
    const membership = await this.membershipModel
      .findOne({ user: userId, organization: organizationId })
      .populate('user', '-password -refreshToken')
      .populate('organization');
    if (!membership) {
      return null;
    }

    return membership;
  }

  // async findUserMemberships(userId: string): Promise<MembershipDocument[]> {
  //   const memberships = await this.findAllByUserId(
  //     String(userId),
  //   );

  //   if (!memberships || memberships.length === 0) {
  //     throw new NotFoundException('No organizations found for this user');
  //   }

  //   return memberships;
  // }

  async findAllMemberships(): Promise<MembershipDocument[]> {
    const memberships = await this.membershipModel
      .find()
      .populate('user', '-password -refreshToken')
      .populate('organization');
    if (!memberships || memberships.length === 0) {
      return [];
    }

    return memberships;
  }

  async updateMemberRole(
    adminMembership: MembershipDocument, // injected via @Membership() guard
    membershipId: string,
    role: MembershipRole,
  ): Promise<MembershipDocument> {
    validateObjectId(membershipId);
    const membership = await this.membershipModel.findById(membershipId);

    if (!membership) throw new NotFoundException('Membership not found');

    if (
      membership.organization.toString() !==
      adminMembership.organization._id.toString()
    ) {
      throw new ForbiddenException(
        'Cannot update member outside your organization',
      );
    }

    if (String(membership._id) === String(adminMembership._id)) {
      throw new ForbiddenException('You cannot update your own role');
    }

    membership.role = role;
    await membership.save();

    return membership;
  }

  async leaveOrganization(userId: string, orgId: string): Promise<void> {
    validateObjectId(userId);
    validateObjectId(orgId);

    const membership = await this.membershipModel.findOneAndDelete({
      user: userId,
      organization: orgId,
    });

    if (!membership) {
      throw new NotFoundException('Membership not found');
    }
  }
}
