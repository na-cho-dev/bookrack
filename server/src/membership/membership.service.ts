import {
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
import { FilterQuery, Model } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { validateObjectId } from 'src/common/utils/validate-objectid.utils';

@Injectable()
export class MembershipService {
  constructor(
    @InjectModel(Membership.name)
    private readonly membershipModel: Model<MembershipDocument>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
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
      userEmail: user.email,
      organization: organizationId,
      role,
    });
  }

  async findOne(
    query: FilterQuery<Membership>,
  ): Promise<MembershipDocument | null> {
    const membership = await this.membershipModel
      .findOne(query)
      .populate('organization');
    if (!membership) {
      return null;
    }

    return membership;
  }

  async findAllByUserId(userId: string): Promise<MembershipDocument[]> {
    const memberships = await this.membershipModel
      .find({ user: userId })
      .populate('organization')
      .select('-user');
    if (!memberships || memberships.length === 0) {
      return [];
    }

    return memberships;
  }

  async findUsersByOrganization(orgId: string) {
    return this.membershipModel
      .find({ organization: orgId })
      .populate('user', '-password -refreshToken');
  }

  async findByUserAndOrganization(
    userId: string,
    organizationId: string,
  ): Promise<MembershipDocument | null> {
    const membership = await this.membershipModel
      .findOne({ user: userId, organization: organizationId })
      .populate('organization');
    if (!membership) {
      return null;
    }

    return membership;
  }

  async findAllMemberships(): Promise<MembershipDocument[]> {
    const memberships = await this.membershipModel
      .find()
      .populate('user organization');
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
}
