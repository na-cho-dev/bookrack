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
import { Book, BookDocument } from 'src/book/schemas/book.schema';

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

  async validateBookOrganization(
    bookId: string,
    orgId: string,
  ): Promise<BookDocument> {
    validateObjectId(bookId);
    const book = await this.bookService.getBookById(bookId, orgId);
    if (!book) {
      throw new BadRequestException('Book not found in this organization');
    }
    if (!book)
      throw new BadRequestException(
        'Book does not belong to this organization',
      );

    return book;
  }

  async createBorrowRecord(
    borrowBook: CreateBorrowBookDto,
    userId: string,
    orgId: string,
  ): Promise<BorrowBook> {
    validateObjectId(borrowBook.book);

    // Fetch the book and check organization
    await this.validateBookOrganization(borrowBook.book, orgId);

    const existingRecord = await this.borrowBookModel.findOne({
      user: userId,
      book: borrowBook.book,
      status: { $in: ['pending', 'borrowed'] },
    });

    if (existingRecord) {
      throw new BadRequestException(
        'You already have a pending or active borrow for this book',
      );
    }

    // if (borrowBook.dueDate < borrowBook.borrowDate) {
    //   throw new BadRequestException(
    //     'Due date cannot be earlier than borrow date',
    //   );
    // }

    const newBorrowRecord = new this.borrowBookModel({
      ...borrowBook,
      requestedAt: new Date(),
      user: userId,
      status: 'pending',
    });
    const savedBorrowedRecord = await newBorrowRecord.save();
    const populatedRecord = await savedBorrowedRecord.populate('user book');

    // // Check and reduce available copies of the book
    // await this.bookService.updateAvailableCopies(borrowBook.book, -1);

    return populatedRecord;
  }

  async cancelBorrowRequest(id: string, orgId: string): Promise<BorrowBook> {
    validateObjectId(id);

    const borrowRecord = await this.borrowBookModel.findById(id);

    if (!borrowRecord || borrowRecord.status === 'returned')
      throw new BadRequestException('Book is already returned or not found');

    await this.validateBookOrganization(String(borrowRecord.book), orgId);

    borrowRecord.status = 'canceled';
    const savedBorrowRecord = await borrowRecord.save();
    const populatedRecord = await savedBorrowRecord.populate('user book');

    return populatedRecord;
  }

  async approveBorrowRequest(
    id: string,
    updateData: UpdateBorrowBookDto,
    orgId: string,
  ): Promise<BorrowBook> {
    validateObjectId(id);
    // Find the borrow record and ensure it's pending
    const borrowRecord = await this.borrowBookModel.findById(id);
    if (!borrowRecord) throw new NotFoundException('Borrow request not found');

    await this.validateBookOrganization(String(borrowRecord.book), orgId);

    if (borrowRecord.status !== 'pending')
      throw new BadRequestException('Request is not pending');

    // Check and reduce available copies of the book
    const book = borrowRecord.book as BookDocument;
    await this.bookService.updateAvailableCopies(String(book._id), -1);

    // Set borrow and due dates
    const borrowDate = new Date();
    const dueDate =
      updateData.dueDate ||
      new Date(borrowDate.getTime() + 14 * 24 * 60 * 60 * 1000);
    if (updateData.dueDate && dueDate < borrowDate)
      throw new BadRequestException(
        'Due date cannot be earlier than borrow date',
      );

    // Update Borrow Record
    borrowRecord.set({
      status: 'borrowed',
      borrowDate,
      dueDate,
    });
    await borrowRecord.save();

    return borrowRecord;
  }

  async returnBook(id: string, orgId: string): Promise<BorrowBook> {
    validateObjectId(id);

    const borrowRecord = await this.borrowBookModel.findById(id);

    if (!borrowRecord || borrowRecord.status === 'returned')
      throw new BadRequestException('Book is already returned or not found');

    await this.validateBookOrganization(String(borrowRecord.book), orgId);

    borrowRecord.status = 'pending-return';
    const savedBorrowRecord = await borrowRecord.save();
    const populatedRecord = await savedBorrowRecord.populate('user book');

    return populatedRecord;
  }

  async approveBookReturn(id: string, orgId: string): Promise<BorrowBook> {
    validateObjectId(id);

    const returnedBook = await this.borrowBookModel.findById(id);

    if (!returnedBook || returnedBook.status === 'returned')
      throw new BadRequestException('Book is already returned or not found');

    await this.validateBookOrganization(String(returnedBook.book), orgId);

    returnedBook.status = 'returned';
    returnedBook.returnDate = new Date();
    const savedreturnedBook = await returnedBook.save();

    // Increase available copies of the book
    const book = returnedBook.book as BookDocument;
    await this.bookService.updateAvailableCopies(book._id.toString(), 1);
    const populatedRecord = await savedreturnedBook.populate('user book');

    return populatedRecord;
  }

  async getBorrowRecordsByStatus(
    orgId: string,
    statuses?: string[],
  ): Promise<BorrowBook[]> {
    if (
      statuses &&
      !statuses.every((status) =>
        [
          'pending',
          'canceled',
          'borrowed',
          'pending-return',
          'returned',
        ].includes(status),
      )
    )
      throw new BadRequestException(
        'Invalid status. Allowed values are: pending, canceled, borrowed, pending-return, returned',
      );

    const query: any = {};
    if (statuses) query.status = { $in: statuses };

    const borrowRecords = await this.borrowBookModel
      .find(query)
      .populate([{ path: 'book' }, { path: 'user', select: 'name email' }]);

    // Filter by organization
    const filtered = borrowRecords.filter((record) => {
      const book = record.book as BookDocument;
      return book && book.organization.toString() === orgId;
    });

    if (!filtered.length) {
      throw new NotFoundException(
        'No borrow records found for this organization',
      );
    }

    return filtered;
  }

  async getUserBorrowRecordsByStatus(
    userId: string,
    orgId: string,
    statuses?: string[],
  ): Promise<BorrowBook[]> {
    validateObjectId(userId);
    if (
      statuses &&
      !statuses.every((status) =>
        [
          'pending',
          'canceled',
          'borrowed',
          'pending-return',
          'returned',
        ].includes(status),
      )
    )
      throw new BadRequestException(
        'Invalid status. Allowed values are: pending, canceled, borrowed, pending-return, returned',
      );

    const query: any = { user: userId };
    if (statuses) query.status = { $in: statuses };

    const borrowRecords = await this.borrowBookModel
      .find(query)
      .populate([{ path: 'book' }, { path: 'user', select: 'name email' }]);

    // Filter by organization
    const filtered = borrowRecords.filter((record) => {
      const book = record.book as BookDocument;
      return book && book.organization.toString() === orgId;
    });

    if (!filtered.length) {
      throw new NotFoundException(
        'No borrow records found for this user in this organization',
      );
    }

    return filtered;
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
