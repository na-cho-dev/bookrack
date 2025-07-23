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
import { UserService } from '../user/user.service';
import { validateObjectId } from '../common/utils/validate-objectid.utils';
import { OrganizationService } from '../organization/organization.service';

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
    const objUserId = validateObjectId(userId);
    const objOrganizationId = validateObjectId(organizationId);

    const existing = await this.membershipModel.findOne({
      user: objUserId,
      organization: objOrganizationId,
    });
    if (existing)
      throw new ConflictException('User already part of this organization');

    const user = await this.userService.getUserById(userId);

    return this.membershipModel.create({
      user: objUserId,
      organization: objOrganizationId,
      role,
    });
  }

  async joinOrganization(
    userId: string,
    organizationCode: string,
  ): Promise<MembershipDocument> {
    const objUserId = validateObjectId(userId);
    // Find the organization by code
    const org = await this.organizationService.findOne({
      code: organizationCode,
    });
    if (!org)
      throw new NotFoundException('Organization not found with provided code');

    // Prevent duplicate membership
    const existing = await this.membershipModel.findOne({
      user: objUserId,
      organization: org._id,
    });

    if (existing) {
      throw new BadRequestException(
        'You are already a member of this organization',
      );
    }

    // Create the membership (default role: user, status: pending or active)
    const membership = await this.membershipModel.create({
      user: objUserId,
      organization: org._id,
      role: MembershipRole.MEMBER,
      status: 'pending', // or 'pending' if you want admin approval
    });

    if (!membership) throw new ConflictException('Failed to join organization');

    // Populate Membership with user and organization details
    await membership.populate('user', '-password -refreshToken');
    await membership.populate({
      path: 'organization',
      populate: {
        path: 'owner',
        select: 'email',
      },
    });

    return membership;
  }

  async findOne(
    query: FilterQuery<Membership>,
  ): Promise<MembershipDocument | null> {
    const membership = await this.membershipModel
      .findOne(query)
      .populate('user', '-password -refreshToken')
      .populate({
        path: 'organization',
        populate: {
          path: 'owner',
          select: 'email',
        },
      });

    if (!membership) return null;

    return membership;
  }

  async findAllByUserId(userId: string): Promise<MembershipDocument[]> {
    const objUserId = validateObjectId(userId);
    const memberships = await this.membershipModel
      .find({ user: objUserId })
      .populate('user', '-password -refreshToken')
      .populate({
        path: 'organization',
        populate: {
          path: 'owner',
          select: 'email',
        },
      });

    if (!memberships || memberships.length === 0) return [];

    return memberships;
  }

  async findUsersByOrganization(orgId: string): Promise<MembershipDocument[]> {
    const objOrgId = validateObjectId(orgId);

    return this.membershipModel
      .find({ organization: objOrgId })
      .populate('user', '-password -refreshToken')
      .populate({
        path: 'organization',
        populate: {
          path: 'owner',
          select: 'email',
        },
      });
  }

  async findByUserAndOrganization(
    userId: string,
    organizationId: string,
  ): Promise<MembershipDocument | null> {
    const objUserId = validateObjectId(userId);
    const objOrgId = validateObjectId(organizationId);

    const membership = await this.membershipModel
      .findOne({ user: objUserId, organization: objOrgId })
      .populate('user', '-password -refreshToken')
      .populate({
        path: 'organization',
        populate: {
          path: 'owner',
          select: 'email',
        },
      });
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
      .populate({
        path: 'organization',
        populate: {
          path: 'owner',
          select: 'email',
        },
      });
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

    if (String(membership._id) === String(adminMembership._id))
      throw new ForbiddenException('You cannot update your own role');

    membership.role = role;
    await membership.save();

    return membership;
  }

  async transferOwnership(
    orgId: string,
    currentAdminId: string,
    newOwnerId: string,
  ): Promise<MembershipDocument> {
    const objOrgId = validateObjectId(orgId);
    const objCurrentAdminId = validateObjectId(currentAdminId);
    const objNewOwnerId = validateObjectId(newOwnerId);

    // Find organization
    const org = await this.organizationService.getOrgById(orgId);
    if (!org) throw new NotFoundException('Organization not found');

    console.log('Owner String ID: ', String(org.owner));
    console.log('Current Admin String ID: ', String(objCurrentAdminId));

    if (String(org.owner._id) !== String(objCurrentAdminId)) {
      throw new ForbiddenException(
        'Only the current owner can transfer ownership',
      );
    }
    if (String(objCurrentAdminId) === String(objNewOwnerId))
      throw new BadRequestException('Cannot transfer ownership to yourself');

    // Find new owner's membership in this org
    const newOwnerMembership = await this.membershipModel.findOne({
      user: objNewOwnerId,
      organization: objOrgId,
    });
    if (!newOwnerMembership) {
      throw new NotFoundException(
        'New owner must be a member of the organization',
      );
    }

    // Update organization owner
    org.owner = objNewOwnerId;
    await org.save();

    // Update roles: new owner becomes admin, current admin can be demoted to member or staff
    newOwnerMembership.role = MembershipRole.ADMIN;
    await newOwnerMembership.save();

    // Optionally, demote the old admin (current owner) to MEMBER
    const oldAdminMembership = await this.membershipModel.findOne({
      user: currentAdminId,
      organization: objOrgId,
    });
    if (oldAdminMembership) {
      oldAdminMembership.role = MembershipRole.MEMBER;
      await oldAdminMembership.save();
    }

    return newOwnerMembership;
  }

  async leaveOrganization(userId: string, orgId: string): Promise<void> {
    const objUserId = validateObjectId(userId);
    const objOrgId = validateObjectId(orgId);

    const membership = await this.membershipModel.findOne({
      user: objUserId,
      organization: objOrgId,
    });

    if (!membership) throw new NotFoundException('Membership not found');

    if (membership.role === 'admin') {
      const memberCount = await this.membershipModel.countDocuments({
        organization: objOrgId,
      });

      if (memberCount > 1) {
        throw new ForbiddenException(
          'Admin cannot leave organization unless ownership is transferred to another user.',
        );
      } else {
        await this.membershipModel.deleteOne({ _id: membership._id });
        await this.organizationService.deleteOrganization(String(objOrgId));
        return;
      }
    }

    // Not admin, just remove membership
    await this.membershipModel.deleteOne({ _id: membership._id });
  }
}