import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { MembershipService } from '../membership/membership.service';
import { Types } from 'mongoose';

@Injectable()
export class MembershipGuard implements CanActivate {
  constructor(private membershipService: MembershipService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    const orgId = req.headers['x-organization-id'];
    const orgObjectId = new Types.ObjectId(orgId);

    if (!orgId) {
      throw new BadRequestException('Organization ID is required.');
    }

    const membership = await this.membershipService.findOne({
      user: user._id,
      organization: orgObjectId,
    });

    if (!membership || membership.status !== 'active')
      throw new ForbiddenException(
        'User is not an active member of this organization.',
      );

    req.membership = membership;
    // console.log('Membership Request:', req.membership);

    return true;
  }
}
