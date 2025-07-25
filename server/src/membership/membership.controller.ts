import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JWTAuthGuard } from 'src/guards/jwt-auth.guard';
import { MembershipGuard } from 'src/guards/membership.guard';
import { MembershipRoleGuard } from 'src/guards/membership-role.guard';
import { TransferOwnershipDto } from './dto/transfer-ownership.dto';
import {
  MembershipDocument,
  MembershipRole,
} from './schemas/membership.schema';
import { Membership } from 'src/decorators/membership.decorator';
import { MembershipService } from './membership.service';
import { MembershipRoles } from 'src/decorators/membership-role.decorator';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { UserResponse } from 'src/user/interface/user.interface';

@Controller('membership')
export class MembershipController {
  constructor(private readonly membershipService: MembershipService) {}

  @Post('join')
  @UseGuards(JWTAuthGuard)
  async joinOrg(
    @Body('orgCode') orgCode: string,
    @CurrentUser() user: UserResponse,
  ) {
    const userId = user._id;
    const membership = await this.membershipService.joinOrganization(
      userId,
      orgCode,
    );
    return { message: 'Joined organization successfully', data: membership };
  }

  @Get()
  @UseGuards(JWTAuthGuard, MembershipGuard, MembershipRoleGuard)
  @MembershipRoles(MembershipRole.ADMIN)
  async getAllMemberships() {
    const memberships = await this.membershipService.findAllMemberships();
    return { message: 'Memberships retrieved successfully', data: memberships };
  }

  @Get('organization/users')
  @UseGuards(JWTAuthGuard, MembershipGuard, MembershipRoleGuard)
  @MembershipRoles(MembershipRole.ADMIN)
  async getUsersByOrganization(@Membership() membership: MembershipDocument) {
    const orgId = membership.organization._id;
    const users = await this.membershipService.findUsersByOrganization(
      String(orgId),
    );
    return { message: 'Users retrieved successfully', data: users };
  }

  @Get('user/all')
  @UseGuards(JWTAuthGuard)
  async getUserOrgs(@CurrentUser() user: UserResponse) {
    const orgs = await this.membershipService.findAllByUserId(user._id);
    return { message: 'User memberships retrieved successfully', data: orgs };
  }

  @Patch(':id/role')
  @UseGuards(JWTAuthGuard, MembershipGuard, MembershipRoleGuard)
  @MembershipRoles(MembershipRole.ADMIN)
  async updateMemberRole(
    @Membership() adminMembership: MembershipDocument,
    @Param('id') membershipId: string,
    @Body('role') role: MembershipRole,
  ) {
    const updatedMembership = await this.membershipService.updateMemberRole(
      adminMembership,
      membershipId,
      role,
    );
    return {
      message: 'Member role updated successfully',
      data: updatedMembership,
    };
  }

  @Patch('organization/transfer-ownership')
  @UseGuards(JWTAuthGuard, MembershipGuard, MembershipRoleGuard)
  @MembershipRoles(MembershipRole.ADMIN)
  async transferOwnership(
    @CurrentUser() user: UserResponse,
    @Membership() membership: MembershipDocument,
    @Body() dto: TransferOwnershipDto,
  ) {
    const orgId = membership.organization._id.toString();
    if (!dto.newOwnerId)
      throw new ForbiddenException('New owner ID must be provided');
    const updatedMembership = await this.membershipService.transferOwnership(
      orgId,
      user._id,
      dto.newOwnerId,
    );
    return {
      message: 'Ownership transferred successfully',
      data: updatedMembership,
    };
  }

  @Delete('leave')
  @UseGuards(JWTAuthGuard, MembershipGuard)
  async leaveOrganization(
    @CurrentUser() user: UserResponse,
    @Membership() membership: MembershipDocument,
  ) {
    const orgId = membership.organization._id.toString();
    const result = await this.membershipService.leaveOrganization(
      user._id,
      orgId,
    );
    return { message: 'Left organization successfully', data: result };
  }
}
