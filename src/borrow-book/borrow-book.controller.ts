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
import { BorrowBookService } from './borrow-book.service';
import { CreateBorrowBookDto } from './dto/create-borrow-book.dto';
import { UpdateBorrowBookDto } from './dto/update-borrow-book.dto';
import { JWTAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/user-roles.guard';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Borrow Books')
@ApiCookieAuth('Authentication')
@Controller('borrow-books')
@UseGuards(JWTAuthGuard, RolesGuard)
export class BorrowBookController {
  constructor(private readonly borrowBookService: BorrowBookService) {}

  @Post()
  async createBorrowRecord(@Body() borrowBookDto: CreateBorrowBookDto) {
    const borrowRecord =
      await this.borrowBookService.createBorrowRecord(borrowBookDto);

    return {
      message: 'Borrow record created successfully',
      data: borrowRecord,
    };
  }

  @Get()
  async getAllBorrowRecords() {
    const borrowRecords = await this.borrowBookService.getAllBorrowRecords();
    return {
      message: 'Borrow records retrieved successfully',
      borrowRecords,
    };
  }

  @Get('return/:id')
  async returnBook(@Param('id') id: string) {
    const returnedBook = await this.borrowBookService.returnBook(id);

    return {
      message: 'Book returned successfully',
      returnedBook,
    };
  }

  @Get('user/:userId')
  async getBorrowRecordsByUserId(@Param('userId') userId: string) {
    const borrowRecords =
      await this.borrowBookService.getBorrowRecordsByUserId(userId);
    return {
      message: 'Borrow records retrieved successfully',
      borrowRecords,
    };
  }

  @Get('book/:bookId')
  async getBorrowRecordsByBookId(@Param('bookId') bookId: string) {
    const borrowRecords =
      await this.borrowBookService.getBorrowRecordsByBookId(bookId);
    return {
      message: 'Borrow records retrieved successfully',
      borrowRecords,
    };
  }

  @Get('user/:userId/overdue')
  async getUserOverdueBooks(@Param('userId') userId: string) {
    const overdueBooks =
      await this.borrowBookService.getUserOverdueBooks(userId);
    return {
      message: 'User overdue books retrieved successfully',
      overdueBooks,
    };
  }

  @Get('overdue')
  async getOverdueBooks() {
    const overdueBooks = await this.borrowBookService.getOverdueBooks();
    return {
      message: 'Overdue books retrieved successfully',
      overdueBooks,
    };
  }

  @Get(':id')
  async getBorrowRecordsById(@Param('id') id: string) {
    const borrowRecord = await this.borrowBookService.getBorrowRecordById(id);
    return {
      message: 'Borrow record retrieved successfully',
      borrowRecord,
    };
  }

  @Put(':id')
  async updateBorrowRecordById(
    @Param('id') id: string,
    @Body() updateData: UpdateBorrowBookDto,
  ) {
    const updatedBorrowRecord =
      await this.borrowBookService.updateBorrowRecordById(id, updateData);
    return {
      message: 'Borrow record updated successfully',
      updatedBorrowRecord,
    };
  }

  @Delete(':id')
  async deleteBorrowRecordById(@Param('id') id: string) {
    const deletedBorrowRecord =
      await this.borrowBookService.deleteBorrowRecordById(id);
    return {
      message: 'Borrow record deleted successfully',
      deletedBorrowRecord,
    };
  }
}
