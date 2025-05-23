import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BorrowBook, BorrowBookDocument } from './schemas/borrow-book.schema';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { CreateBorrowBookDto } from './dto/create-borrow-book.dto';
import { validateObjectId } from 'src/common/utils/validate-objectid.utils';
import { UpdateBookDto } from 'src/book/dto/update-book.dto';
import { UpdateBorrowBookDto } from './dto/update-borrow-book.dto';
import { BookService } from 'src/book/book.service';
import { BookDocument } from 'src/book/schemas/book.schema';

@Injectable()
export class BorrowBookService {
  constructor(
    @InjectModel(BorrowBook.name)
    private readonly borrowBookModel: Model<BorrowBookDocument>,
    private readonly bookService: BookService,
  ) {}

  async getBorrowBookQuery(
    query?: FilterQuery<BorrowBook>,
  ): Promise<BorrowBook[]> {
    return this.borrowBookModel.find(query ?? {});
  }

  async createBorrowRecord(
    borrowBook: CreateBorrowBookDto,
  ): Promise<BorrowBook> {
    validateObjectId(borrowBook.user);
    validateObjectId(borrowBook.book);

    const existingRecord = await this.borrowBookModel.findOne({
      user: borrowBook.user,
      book: borrowBook.book,
      status: 'borrowed',
    });

    if (existingRecord) {
      throw new BadRequestException(
        'Borrow record already exists for this user and book',
      );
    }

    if (borrowBook.dueDate < borrowBook.borrowDate) {
      throw new BadRequestException(
        'Due date cannot be earlier than borrow date',
      );
    }

    const newBorrowRecord = new this.borrowBookModel(borrowBook);
    const savedBorrowedRecord = await newBorrowRecord.save();

    // Check and reduce available copies of the book
    await this.bookService.updateAvailableCopies(borrowBook.book, -1);

    const populatedRecord = await savedBorrowedRecord.populate('user book');

    return populatedRecord;
  }

  async returnBook(id: string): Promise<BorrowBook> {
    validateObjectId(id);

    const borrowRecord = await this.borrowBookModel
      .findById(id)
      .populate('book');

    if (!borrowRecord || borrowRecord.status === 'returned') {
      throw new BadRequestException('Book is already returned or not found');
    }

    borrowRecord.status = 'returned';
    borrowRecord.returnDate = new Date();
    const savedBorrowRecord = await borrowRecord.save();

    // Increase available copies of the book
    const book = borrowRecord.book as BookDocument;
    await this.bookService.updateAvailableCopies(book._id.toString(), 1);

    const populatedRecord = await savedBorrowRecord.populate('user book');

    return populatedRecord;
  }

  async getAllBorrowRecords(): Promise<BorrowBook[]> {
    const borrowRecords = await this.borrowBookModel
      .find()
      .populate('user book');
    if (!borrowRecords || borrowRecords.length === 0) {
      throw new NotFoundException('No borrow records found');
    }

    return borrowRecords;
  }

  async getBorrowRecordsByUserId(userId: string): Promise<BorrowBook[]> {
    validateObjectId(userId);
    const borrowRecords = await this.borrowBookModel
      .find({ user: userId })
      .populate('user book');
    if (borrowRecords.length === 0) {
      throw new NotFoundException('No borrow records found for this user');
    }
    return borrowRecords;
  }

  async getBorrowRecordsByBookId(bookId: string): Promise<BorrowBook[]> {
    validateObjectId(bookId);
    const borrowRecords = await this.borrowBookModel
      .find({ book: bookId })
      .populate('user book');
    if (borrowRecords.length === 0) {
      throw new NotFoundException('No borrow records found for this book');
    }
    return borrowRecords;
  }

  async getBorrowRecordById(id: string): Promise<BorrowBook> {
    validateObjectId(id);

    const borrowRecord = await this.borrowBookModel
      .findById(id)
      .populate('user book');
    if (!borrowRecord) {
      throw new NotFoundException('Borrow record not found');
    }

    return borrowRecord;
  }

  async updateBorrowRecordById(
    id: string,
    updateData: UpdateQuery<UpdateBorrowBookDto>,
  ): Promise<BorrowBook> {
    validateObjectId(id);

    const updatedBorrowRecord = await this.borrowBookModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .populate('user book');

    if (!updatedBorrowRecord) {
      throw new NotFoundException('Borrow record not found');
    }

    return updatedBorrowRecord;
  }

  async deleteBorrowRecordById(id: string): Promise<BorrowBook> {
    validateObjectId(id);

    const deletedBorrowRecord = await this.borrowBookModel
      .findByIdAndDelete(id)
      .populate('user book');

    if (!deletedBorrowRecord) {
      throw new NotFoundException('Borrow record not found');
    }

    return deletedBorrowRecord;
  }

  async getOverdueBooks(): Promise<BorrowBook[]> {
    const currentDate = new Date();
    const overdueBooks = await this.borrowBookModel
      .find({
        dueDate: { $lt: currentDate },
        status: 'borrowed',
      })
      .populate('user book');

    if (overdueBooks.length === 0) {
      throw new NotFoundException('No overdue books found');
    }

    return overdueBooks;
  }

  async getUserOverdueBooks(userId: string): Promise<BorrowBook[]> {
    validateObjectId(userId);
    const currentDate = new Date();
    const overdueBooks = await this.borrowBookModel
      .find({
        user: userId,
        dueDate: { $lt: currentDate },
        status: 'borrowed',
      })
      .populate('user book');

    if (overdueBooks.length === 0) {
      throw new NotFoundException('No overdue books found for this user');
    }

    return overdueBooks;
  }
}
