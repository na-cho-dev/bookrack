import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class MembershipRoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      'roles', // key we set with @Roles()
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) return true; // No roles specified = allow access

    const request = context.switchToHttp().getRequest();

    if (!request.membership) {
      throw new ForbiddenException('Membership context not found.');
    }

    const role = request.membership.role;

    if (!requiredRoles.includes(role)) {
      throw new ForbiddenException(
        'You do not have permission to access this resource',
      );
    }

    return true;
  }
}
