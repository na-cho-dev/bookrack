import { IsMongoId, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateOrganizationDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  // @IsMongoId()
  // owner: string;
}
