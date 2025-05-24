import { ApiProperty } from '@nestjs/swagger';
import { IsISBN, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateBookDto {
  @ApiProperty({
    description: 'The ISBN of the book',
    example: '978-3-16-148410-0',
  })
  @IsString()
  @IsISBN(13)
  @IsOptional()
  isbn?: string;

  @ApiProperty({
    description: 'The title of the book',
    example: 'The Great Gatsby',
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    description: 'The author of the book',
    example: 'F. Scott Fitzgerald',
  })
  @IsString()
  @IsOptional()
  author?: string;

  @ApiProperty({
    description: 'The year the book was published',
    example: 1925,
  })
  @IsNumber()
  @IsOptional()
  publishedYear?: number;

  @ApiProperty({
    description: 'The genre of the book',
    example: 'Fiction',
  })
  @IsString()
  @IsOptional()
  genre?: string;
}
