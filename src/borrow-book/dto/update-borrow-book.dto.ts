import { IsDateString, IsOptional, IsString } from 'class-validator';
import { BorrowBookStatus } from '../schemas/borrow-book.schema';

export class UpdateBorrowBookDto {
  @IsString()
  @IsOptional()
  user: string;

  @IsString()
  @IsOptional()
  book: string;

  @IsDateString()
  @IsOptional()
  borrowDate: string;

  @IsDateString()
  @IsOptional()
  dueDate: string;

  @IsDateString()
  @IsOptional()
  returnDate?: Date;

  @IsString()
  @IsOptional()
  status: BorrowBookStatus;
}
