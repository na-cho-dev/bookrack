import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
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
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { UserResponse } from 'src/user/interface/user.interface';

@Controller('organization')
@UseGuards(JWTAuthGuard)
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post('create')
  async createOrganization(
    @CurrentUser() user: UserResponse,
    @Body() createOrganizationDto: CreateOrganizationDto,
  ) {
    const userId = String(user._id);
    const org = await this.organizationService.createOrganization(
      createOrganizationDto,
      userId,
    );

    return { message: 'Organization created successfully', data: org };
  }

  @Get()
  async getAllOrgs() {
    const orgs = await this.organizationService.getAllOrgs();
    return { message: 'Organizations retrieved successfully', data: orgs };
  }

  @Get('code/:code')
  // @UseGuards(MembershipGuard)
  async getOrgByCode(@Param('code') code: string) {
    const org = await this.organizationService.getOrgByCode(code);
    return { message: 'Organization retrieved successfully', data: org };
  }

  @Get('search')
  async searchOrganizations(@Query() filters: SearchOrganizationDto) {
    const org = await this.organizationService.searchOrganizations(filters);
    return { message: 'Organizations retrieved successfully', data: org };
  }

  @Patch('update')
  @UseGuards(MembershipGuard, MembershipRoleGuard)
  @MembershipRoles(MembershipRole.ADMIN)
  async updateOrganization(
    @Membership() membership: MembershipDocument,
    @Body() updateData: UpdateQuery<CreateOrganizationDto>,
  ) {
    const orgId = membership.organization._id;
    const org = await this.organizationService.updateOrganization(
      String(orgId),
      updateData,
    );
    return { message: 'Organization updated successfully', data: org };
  }

  @Delete('delete')
  @UseGuards(MembershipGuard, MembershipRoleGuard)
  @MembershipRoles(MembershipRole.ADMIN)
  async deleteOrganization(@Membership() membership: MembershipDocument) {
    const orgId = membership.organization._id;
    const org = await this.organizationService.deleteOrganization(
      String(orgId),
    );
    return { message: 'Organization deleted successfully', data: org };
  }

  @Delete(':id')
  // @UseGuards(MembershipGuard, MembershipRoleGuard)
  // @MembershipRoles(MembershipRole.ADMIN)
  async deleteOrganizationById(@Param('id') id: string) {
    const org = await this.organizationService.deleteOrganization(id);
    return { message: 'Organization deleted successfully', data: org };
  }

  @Get(':id')
  // @UseGuards(MembershipGuard)
  async getOrganizationById(@Param('id') id: string) {
    const org = await this.organizationService.getOrgById(id);
    return { message: 'Organization retrieved successfully', data: org };
  }
}