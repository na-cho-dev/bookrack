import { OrganizationService } from './organization.service';
import { MembershipDocument } from 'src/membership/schemas/membership.schema';
import { UpdateQuery } from 'mongoose';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UserResponse } from 'src/user/interface/user.interface';
import { SearchOrganizationDto } from './dto/search-organization.dto';
export declare class OrganizationController {
    private readonly organizationService;
    constructor(organizationService: OrganizationService);
    getAllOrgs(): Promise<import("./schemas/organization.shema").OrganizationDocument[]>;
    getUserOrgs(user: UserResponse): Promise<MembershipDocument[]>;
    getOrgByCode(code: string): Promise<import("./schemas/organization.shema").OrganizationDocument | null>;
    searchOrganizations(filters: SearchOrganizationDto): Promise<import("./schemas/organization.shema").OrganizationDocument[]>;
    updateOrganization(membership: MembershipDocument, updateData: UpdateQuery<CreateOrganizationDto>): Promise<import("./schemas/organization.shema").OrganizationDocument | null>;
    deleteOrganization(membership: MembershipDocument): Promise<import("./schemas/organization.shema").OrganizationDocument | null>;
    getOrganizationById(id: string): Promise<import("./schemas/organization.shema").OrganizationDocument | null>;
}
