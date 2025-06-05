import { MembershipDocument } from 'src/membership/schemas/membership.schema';

declare module 'express' {
  export interface Request {
    membership?: MembershipDocument;
  }
}
