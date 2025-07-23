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
import { UpdateRoleDto } from './dto/update-role.dto';
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
import { log } from 'console';

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
    return this.membershipService.joinOrganization(userId, orgCode);
  }

  @Get()
  @UseGuards(JWTAuthGuard, MembershipGuard, MembershipRoleGuard)
  @MembershipRoles(MembershipRole.ADMIN)
  getAllMemberships() {
    return this.membershipService.findAllMemberships();
  }

  @Get('organization/users')
  @UseGuards(JWTAuthGuard, MembershipGuard, MembershipRoleGuard)
  @MembershipRoles(MembershipRole.ADMIN)
  getUsersByOrganization(@Membership() membership: MembershipDocument) {
    const orgId = membership.organization._id;
    return this.membershipService.findUsersByOrganization(String(orgId));
  }

  @Get('user/all')
  @UseGuards(JWTAuthGuard)
  async getUserOrgs(@CurrentUser() user: UserResponse) {
    const orgs = await this.membershipService.findAllByUserId(user._id);
    return orgs;
  }

  @Patch(':id/role')
  @UseGuards(JWTAuthGuard, MembershipGuard, MembershipRoleGuard)
  @MembershipRoles(MembershipRole.ADMIN)
  async updateMemberRole(
    @Membership() adminMembership: MembershipDocument,
    @Param('id') membershipId: string,
    @Body('role') role: MembershipRole,
  ) {
    return this.membershipService.updateMemberRole(
      adminMembership,
      membershipId,
      role,
    );
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
    return await this.membershipService.transferOwnership(
      orgId,
      user._id,
      dto.newOwnerId,
    );
  }

  @Delete('leave')
  @UseGuards(JWTAuthGuard, MembershipGuard)
  async leaveOrganization(
    @CurrentUser() user: UserResponse,
    @Membership() membership: MembershipDocument,
  ) {
    const orgId = membership.organization._id.toString();
    return this.membershipService.leaveOrganization(user._id, orgId);
  }
}
