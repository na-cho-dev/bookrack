import { Module } from '@nestjs/common';
import { BorrowBookController } from './borrow-book.controller';
import { BorrowBookService } from './borrow-book.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BorrowBook, BorrowBookSchema } from './schemas/borrow-book.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BorrowBook.name, schema: BorrowBookSchema },
    ]),
  ],
  controllers: [BorrowBookController],
  providers: [BorrowBookService],
})
export class BorrowBookModule {}
