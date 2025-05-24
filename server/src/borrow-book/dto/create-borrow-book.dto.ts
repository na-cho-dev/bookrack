import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateBorrowBookDto {
  @ApiProperty({
    description: 'The ID of the user borrowing the book',
    example: '60d21b4667d0d8992e610c85',
  })
  @IsString()
  @IsNotEmpty()
  user: string;

  @ApiProperty({
    description: 'The ID of the book being borrowed',
    example: '60d21b4667d0d8992e610c86',
  })
  @IsString()
  @IsNotEmpty()
  book: string;

  @ApiProperty({
    description: 'The date the book was borrowed',
    example: '2023-03-15',
  })
  @IsNotEmpty()
  @IsDateString()
  borrowDate: string;

  @ApiProperty({
    description: 'The date the book is due',
    example: '2023-03-22',
  })
  @IsNotEmpty()
  @IsDateString()
  dueDate: string;
}
