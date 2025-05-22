import { IsISBN, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddBookDto {
  @IsString()
  @IsISBN(13)
  @IsNotEmpty()
  isbn: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsNumber()
  publishedYear: number;

  @IsString()
  @IsNotEmpty()
  genre: string;
}
