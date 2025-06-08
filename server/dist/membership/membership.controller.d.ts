import { MembershipDocument, MembershipRole } from './schemas/membership.schema';
import { MembershipService } from './membership.service';
import { UserResponse } from 'src/user/interface/user.interface';
export declare class MembershipController {
    private readonly membershipService;
    constructor(membershipService: MembershipService);
    getAllMemberships(): Promise<MembershipDocument[]>;
    getUsersByOrganization(membership: MembershipDocument): Promise<(import("mongoose").Document<unknown, {}, MembershipDocument, {}> & import("./schemas/membership.schema").Membership & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getUserOrgs(user: UserResponse): Promise<MembershipDocument[]>;
    updateMemberRole(adminMembership: MembershipDocument, membershipId: string, role: MembershipRole): Promise<MembershipDocument>;
}
