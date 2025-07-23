import { BadRequestException } from '@nestjs/common';
import { isValidObjectId, Types } from 'mongoose';

export function validateObjectId(id: string): Types.ObjectId {
  if (!isValidObjectId(id)) {
    throw new BadRequestException(`Invalid ObjectId: ${id}`);
  }

  const newObjId = new Types.ObjectId(id);

  return newObjId;
}
