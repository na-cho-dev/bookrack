import { IsISBN, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateBookDto {
  @IsString()
  @IsISBN(13)
  @IsOptional()
  isbn?: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  author?: string;

  @IsNumber()
  @IsOptional()
  publishedYear?: number;

  @IsString()
  @IsOptional()
  genre?: string;
}
