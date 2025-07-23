import { Membership } from '../../membership/schemas/membership.schema';
import { Organization } from '../../organization/schemas/organization.shema';

export interface BaseUserInput {
  _id?: string;
  email: string;
  name?: string;
  password?: string;
  role: 'admin' | 'staff' | 'member';
}

export interface AdminInput extends BaseUserInput {
  role: 'admin';
  organizationName: string;
  organizationDescription: string;
}

export interface UserInput extends BaseUserInput {
  role: 'member' | 'staff';
  organizationCode: string;
}

export type UserCreationInput = AdminInput | UserInput;

export interface MembershipResponse {
  organization: Organization;
  role: 'admin' | 'staff' | 'member';
}

export interface UserResponse {
  _id: string;
  email: string;
  name: string;
  memberships: Membership[];
}
