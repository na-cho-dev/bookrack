import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateBorrowBookDto {
  @IsString()
  @IsNotEmpty()
  user: string;

  @IsString()
  @IsNotEmpty()
  book: string;

  @IsNotEmpty()
  @IsDateString()
  borrowDate: string;

  @IsNotEmpty()
  @IsDateString()
  dueDate: string;
}
