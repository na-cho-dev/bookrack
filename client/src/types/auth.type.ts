export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterUserPayload {
  name?: string;
  email: string;
  password: string;
  organizationCode?: string;
}

export interface RegisterAdminPayload {
  name?: string;
  email: string;
  password: string;
  organizationName: string;
  organizationDescription: string;
}

export interface Membership {
  _id: string;
  user: User;
  role: string;
  createdAt: string;
  organization: Organization;
}

export interface Organization {
  _id: string;
  name: string;
  description: string;
  owner: string;
  code: string;
}

export interface BasicUser {
  _id: string;
  email: string;
  name: string;
  globalRole: string;
  memberships: Membership[];
}

export interface OrgScopedUser {
  _id: string;
  email: string;
  name: string;
  globalRole: string;
  membership: Membership;
}

export type User = BasicUser | OrgScopedUser;

export interface UserState {
  user: User | null;
  memberships: Membership[] | null;
  currentMembership: Membership | null;
  loadingUser: boolean;

  setUser: (user: User | null) => void;
  setMemberships: (memberships: Membership[] | null) => void;
  setCurrentMembership: (membership: Membership | null) => void;
  setLoadingUser: (loading: boolean) => void;
}

export const isScopedUser = (user: User): user is OrgScopedUser => {
  return "membership" in user;
};
