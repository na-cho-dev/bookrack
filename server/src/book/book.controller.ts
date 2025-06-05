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
import { MembershipRoleGuard } from 'src/guards/membership-role.guard';
import { JWTAuthGuard } from 'src/guards/jwt-auth.guard';
import { MembershipRoles } from 'src/decorators/membership-role.decorator';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { MembershipRole } from 'src/membership/schemas/membership.schema';

@ApiTags('Books')
@ApiCookieAuth('Authentication')
@Controller('books')
@UseGuards(JWTAuthGuard, MembershipRoleGuard)
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @MembershipRoles(MembershipRole.ADMIN)
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
  @MembershipRoles(MembershipRole.ADMIN)
  async updateBook(@Param('id') id: string, @Body() bookDto: UpdateBookDto) {
    const updatedBook = await this.bookService.updateBookById(id, bookDto);
    return {
      message: 'Book updated successfully',
      book: updatedBook,
    };
  }

  @Delete(':id')
  @MembershipRoles(MembershipRole.ADMIN)
  async deleteBook(@Param('id') id: string) {
    const deletedBook = await this.bookService.deleteBookById(id);
    return {
      message: 'Book deleted successfully',
      book: deletedBook,
    };
  }
}
