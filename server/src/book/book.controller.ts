import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
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
import { MembershipGuard } from 'src/guards/membership.guard';

@ApiTags('Books')
@ApiCookieAuth('Authentication')
@Controller('books')
@UseGuards(JWTAuthGuard, MembershipGuard, MembershipRoleGuard)
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post('add')
  @MembershipRoles(MembershipRole.ADMIN)
  async addBook(
    @Body() bookDto: AddBookDto,
    @Headers('x-organization-id') orgId: string,
  ) {
    const book = await this.bookService.addBook(bookDto, orgId);
    return {
      message: 'Book added successfully',
      book,
    };
  }

  @Get('all')
  // @MembershipRoles(MembershipRole.ADMIN)
  async getAllBooks(@Headers('x-organization-id') orgId: string) {
    const books = await this.bookService.getAllBooksByOrg(orgId);
    return {
      message: 'Books retrieved successfully',
      books,
    };
  }

  @Get('available')
  // @MembershipRoles(MembershipRole.ADMIN)
  async getAvailableBooks(@Headers('x-organization-id') orgId: string) {
    const books = await this.bookService.getAvailableBooksByOrg(orgId);
    return {
      message: 'Books retrieved successfully',
      books,
    };
  }

  @Get(':id')
  async getBookById(
    @Param('id') id: string,
    @Headers('x-organization-id') orgId: string,
  ) {
    const book = await this.bookService.getBookById(id, orgId);
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
