import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BorrowBookService } from './borrow-book.service';
import { CreateBorrowBookDto } from './dto/create-borrow-book.dto';
import { UpdateBorrowBookDto } from './dto/update-borrow-book.dto';

@Controller('borrow-books')
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
