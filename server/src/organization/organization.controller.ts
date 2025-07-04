import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { JWTAuthGuard } from 'src/guards/jwt-auth.guard';
import { Membership } from 'src/decorators/membership.decorator';
import {
  MembershipDocument,
  MembershipRole,
} from 'src/membership/schemas/membership.schema';
import { UpdateQuery } from 'mongoose';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { SearchOrganizationDto } from './dto/search-organization.dto';
import { MembershipRoles } from 'src/decorators/membership-role.decorator';
import { MembershipGuard } from 'src/guards/membership.guard';
import { MembershipRoleGuard } from 'src/guards/membership-role.guard';

@Controller('organization')
@UseGuards(JWTAuthGuard)
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Get()
  async getAllOrgs() {
    return this.organizationService.getAllOrgs();
  }

  @Get('code/:code')
  // @UseGuards(MembershipGuard)
  async getOrgByCode(@Param('code') code: string) {
    return this.organizationService.getOrgByCode(code);
  }

  @Get('search')
  async searchOrganizations(@Query() filters: SearchOrganizationDto) {
    return this.organizationService.searchOrganizations(filters);
  }

  @Patch('update')
  @UseGuards(MembershipGuard, MembershipRoleGuard)
  @MembershipRoles(MembershipRole.ADMIN)
  async updateOrganization(
    @Membership() membership: MembershipDocument,
    @Body() updateData: UpdateQuery<CreateOrganizationDto>,
  ) {
    const orgId = membership.organization._id;
    return this.organizationService.updateOrganization(
      String(orgId),
      updateData,
    );
  }

  @Delete('delete')
  @UseGuards(MembershipGuard, MembershipRoleGuard)
  @MembershipRoles(MembershipRole.ADMIN)
  async deleteOrganization(@Membership() membership: MembershipDocument) {
    const orgId = membership.organization._id;
    return this.organizationService.deleteOrganization(String(orgId));
  }

  @Get(':id')
  // @UseGuards(MembershipGuard)
  async getOrganizationById(@Param('id') id: string) {
    return this.organizationService.getOrgById(id);
  }
}
