import { Membership, MembershipDocument, MembershipRole } from './schemas/membership.schema';
import { FilterQuery, Model } from 'mongoose';
import { UserService } from 'src/user/user.service';
export declare class MembershipService {
    private readonly membershipModel;
    private readonly userService;
    constructor(membershipModel: Model<MembershipDocument>, userService: UserService);
    createMembership(userId: string, organizationId: string, role: MembershipRole): Promise<MembershipDocument>;
    findOne(query: FilterQuery<Membership>): Promise<MembershipDocument | null>;
    findAllByUserId(userId: string): Promise<MembershipDocument[]>;
    findUsersByOrganization(orgId: string): Promise<(import("mongoose").Document<unknown, {}, MembershipDocument, {}> & Membership & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findByUserAndOrganization(userId: string, organizationId: string): Promise<MembershipDocument | null>;
    findAllMemberships(): Promise<MembershipDocument[]>;
    updateMemberRole(adminMembership: MembershipDocument, membershipId: string, role: MembershipRole): Promise<MembershipDocument>;
}
