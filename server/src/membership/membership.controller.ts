import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { JWTAuthGuard } from 'src/guards/jwt-auth.guard';
import { MembershipGuard } from 'src/guards/membership.guard';
import { MembershipRoleGuard } from 'src/guards/membership-role.guard';
import { UpdateRoleDto } from './dto/update-role.dto';
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
    const orgs = await this.membershipService.findAllByUserId(String(user._id));
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
}
