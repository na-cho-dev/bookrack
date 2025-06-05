import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { MembershipService } from 'src/membership/membership.service';

@Injectable()
export class MembershipGuard implements CanActivate {
  constructor(private membershipService: MembershipService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    const orgId = req.headers['x-organization-id'];

    if (!orgId) {
      throw new BadRequestException('Organization ID is required.');
    }

    const membership = await this.membershipService.findOne({
      user: String(user._id),
      organization: String(orgId),
    });

    if (!membership)
      throw new ForbiddenException(
        'User is not a member of this organization.',
      );

    req.membership = membership;

    // console.log('Membership Request:', req.membership);

    return true;
  }
}
