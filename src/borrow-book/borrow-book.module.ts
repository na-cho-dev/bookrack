import { Module } from '@nestjs/common';
import { BorrowBookController } from './borrow-book.controller';
import { BorrowBookService } from './borrow-book.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BorrowBook, BorrowBookSchema } from './schemas/borrow-book.schema';
import { BookService } from 'src/book/book.service';
import { BookModule } from 'src/book/book.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BorrowBook.name, schema: BorrowBookSchema },
    ]),
    BookModule,
  ],
  controllers: [BorrowBookController],
  providers: [BorrowBookService],
})
export class BorrowBookModule {}
