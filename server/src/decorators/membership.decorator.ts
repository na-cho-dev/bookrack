import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { MembershipDocument } from 'src/membership/schemas/membership.schema';

export const Membership = createParamDecorator(
  (data: keyof MembershipDocument | undefined, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<Request>();
    const membership = req.membership as MembershipDocument;

    if (!data) return membership;

    return membership?.[data];
  },
);
