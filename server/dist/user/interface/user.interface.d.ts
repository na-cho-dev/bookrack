import { Membership } from 'src/membership/schemas/membership.schema';
import { Organization } from 'src/organization/schemas/organization.shema';
export interface BaseUserInput {
    _id?: string;
    email: string;
    name?: string;
    password?: string;
    role: 'admin' | 'staff' | 'user';
}
export interface AdminInput extends BaseUserInput {
    role: 'admin';
    organizationName: string;
    organizationDescription: string;
}
export interface UserInput extends BaseUserInput {
    role: 'user' | 'staff';
    organizationCode: string;
}
export type UserCreationInput = AdminInput | UserInput;
export interface MembershipResponse {
    organization: Organization;
    role: 'admin' | 'staff' | 'user';
}
export interface UserResponse {
    _id: string;
    email: string;
    name: string;
    memberships: Membership[];
}
