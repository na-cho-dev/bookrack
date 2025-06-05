import { IsIn, IsMongoId, IsNotEmpty } from 'class-validator';
import { MembershipRole } from '../schemas/membership.schema';

export class UpdateRoleDto {
  @IsMongoId()
  @IsNotEmpty()
  membershipId: string;

  @IsIn(Object.values(MembershipRole))
  role: MembershipRole;
}
