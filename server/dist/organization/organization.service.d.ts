import { Organization, OrganizationDocument } from './schemas/organization.shema';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { MembershipService } from 'src/membership/membership.service';
import { MembershipDocument } from 'src/membership/schemas/membership.schema';
import { SearchOrganizationDto } from './dto/search-organization.dto';
export declare class OrganizationService {
    private readonly organizationModel;
    private readonly membershipService;
    constructor(organizationModel: Model<OrganizationDocument>, membershipService: MembershipService);
    private nanoid;
    getOrgPrefix: (name: string) => string;
    generateUniqueOrgCode(name: string): Promise<string>;
    createOrganization(organizationDto: CreateOrganizationDto): Promise<OrganizationDocument>;
    findOne(query: FilterQuery<Organization>): Promise<OrganizationDocument | null>;
    searchOrganizations(filters: SearchOrganizationDto): Promise<OrganizationDocument[]>;
    getOrgById(id: string): Promise<OrganizationDocument | null>;
    getOrgByCode(code: string): Promise<OrganizationDocument | null>;
    getAllOrgs(): Promise<OrganizationDocument[]>;
    getUserOrgs(userId: string): Promise<MembershipDocument[]>;
    updateOrganization(id: string, updateData: UpdateQuery<CreateOrganizationDto>): Promise<OrganizationDocument | null>;
    deleteOrganization(id: string): Promise<OrganizationDocument | null>;
}
