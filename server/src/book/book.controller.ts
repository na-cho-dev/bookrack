import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AddBookDto } from './dto/create-book.dto';
import { BookService } from './book.service';
import { UpdateBookDto } from './dto/update-book.dto';
import { RolesGuard } from 'src/guards/user-roles.guard';
import { JWTAuthGuard } from 'src/guards/jwt-auth.guard';
import { Roles } from 'src/decorators/user-roles.decorator';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Books')
@ApiCookieAuth('Authentication')
@Controller('books')
@UseGuards(JWTAuthGuard, RolesGuard)
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @Roles('admin')
  async addBook(@Body() bookDto: AddBookDto) {
    const book = await this.bookService.addBook(bookDto);
    return {
      message: 'Book added successfully',
      book,
    };
  }

  @Get()
  async getAllBooks() {
    const books = await this.bookService.getAllBooks();
    return {
      message: 'Books retrieved successfully',
      books,
    };
  }

  @Get(':id')
  async getBookById(@Param('id') id: string) {
    const book = await this.bookService.getBookById(id);
    return {
      message: 'Book retrieved successfully',
      book,
    };
  }

  @Put(':id')
  @Roles('admin')
  async updateBook(@Param('id') id: string, @Body() bookDto: UpdateBookDto) {
    const updatedBook = await this.bookService.updateBookById(id, bookDto);
    return {
      message: 'Book updated successfully',
      book: updatedBook,
    };
  }

  @Delete(':id')
  @Roles('admin')
  async deleteBook(@Param('id') id: string) {
    const deletedBook = await this.bookService.deleteBookById(id);
    return {
      message: 'Book deleted successfully',
      book: deletedBook,
    };
  }
}
