import { IsDateString, IsOptional, IsString } from 'class-validator';
import { BorrowBookStatus } from '../schemas/borrow-book.schema';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBorrowBookDto {
  @ApiProperty({
    description: 'The ID of the user borrowing the book',
    example: '60d21b4667d0d8992e610c85',
  })
  @IsString()
  @IsOptional()
  user: string;

  @ApiProperty({
    description: 'The ID of the book being borrowed',
    example: '60d21b4667d0d8992e610c86',
  })
  @IsString()
  @IsOptional()
  book: string;

  @ApiProperty({
    description: 'The date the book was requested',
    example: '2023-03-15',
  })
  @IsDateString()
  @IsOptional()
  requestedAt: string;

  @ApiProperty({
    description: 'The date the book was borrowed',
    example: '2023-03-15',
  })
  @IsDateString()
  @IsOptional()
  borrowDate: string;

  @ApiProperty({
    description: 'The date the book is due',
    example: '2023-03-22',
  })
  @IsDateString()
  @IsOptional()
  dueDate: string;

  @ApiProperty({
    description: 'The date the book was returned',
    example: '2023-03-20',
  })
  @IsDateString()
  @IsOptional()
  returnDate?: Date;

  @IsString()
  @IsOptional()
  status: BorrowBookStatus;
}
