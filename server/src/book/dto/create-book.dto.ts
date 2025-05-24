import { ApiProperty } from '@nestjs/swagger';
import { IsISBN, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddBookDto {
  @ApiProperty({
    description: 'The ISBN of the book',
    example: '978-3-16-148410-0',
  })
  @IsString()
  @IsISBN(13)
  @IsNotEmpty()
  isbn: string;

  @ApiProperty({
    description: 'The title of the book',
    example: 'The Great Gatsby',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'The author of the book',
    example: 'F. Scott Fitzgerald',
  })
  @IsString()
  @IsNotEmpty()
  author: string;

  @ApiProperty({
    description: 'The genre of the book',
    example: 'Fiction',
  })
  @IsString()
  @IsNotEmpty()
  genre: string;

  @ApiProperty({
    description: 'The year the book was published',
    example: 1925,
  })
  @IsNumber()
  publishedYear: number;

  @ApiProperty({
    description: 'The total number of copies of the book',
    example: 10,
  })
  @IsNumber()
  totalCopies: number;

  @ApiProperty({
    description: 'The number of copies of the book available for borrowing',
    example: 5,
  })
  @IsNumber()
  availableCopies: number;
}
