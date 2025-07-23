import { IsMongoId } from 'class-validator';

export class TransferOwnershipDto {
  @IsMongoId()
  newOwnerId: string;
}