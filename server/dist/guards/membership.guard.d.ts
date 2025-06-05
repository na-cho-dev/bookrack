import { CanActivate, ExecutionContext } from '@nestjs/common';
import { MembershipService } from 'src/membership/membership.service';
export declare class MembershipGuard implements CanActivate {
    private membershipService;
    constructor(membershipService: MembershipService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
