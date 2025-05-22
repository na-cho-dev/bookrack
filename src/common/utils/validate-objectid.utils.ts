import { BadRequestException } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

export function validateObjectId(id: string): void {
  if (!isValidObjectId(id)) {
    throw new BadRequestException(`Invalid ObjectId: ${id}`);
  }
}
