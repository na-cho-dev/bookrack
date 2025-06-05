import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';

export const MembershipRoles = (...roles: string[]) =>
  SetMetadata(ROLES_KEY, roles);
