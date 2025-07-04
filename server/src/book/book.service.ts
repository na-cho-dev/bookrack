import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './schemas/book.schema';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { AddBookDto } from './dto/create-book.dto';
import { validateObjectId } from 'src/common/utils/validate-objectid.utils';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<BookDocument>,
  ) {}

  async getBookQuery(query?: FilterQuery<Book>): Promise<Book[]> {
    return this.bookModel.find(query ?? {});
  }

  async addBook(bookData: AddBookDto, orgId: string): Promise<Book> {
    const existingBook = await this.bookModel.findOne({
      isbn: bookData.isbn,
      organization: orgId,
    });
    if (existingBook) {
      throw new BadRequestException('Book with this ISBN already exists');
    }

    const book = new this.bookModel({ ...bookData, organization: orgId });
    return book.save();
  }

  async getAllBooksByOrg(orgId: string): Promise<Book[]> {
    const books = await this.bookModel
      .find({ organization: orgId })
      .populate('organization');
    if (!books || books.length === 0) {
      throw new NotFoundException('No books found');
    }

    return books;
  }

  async getAvailableBooksByOrg(orgId: string): Promise<Book[]> {
    const books = await this.bookModel
      .find({ organization: orgId, availableCopies: { $gt: 0 } })
      .populate('organization');

    if (!books || books.length === 0)
      throw new NotFoundException('No available books found');

    return books;
  }

  async getBookById(id: string, orgId: string): Promise<BookDocument | null> {
    validateObjectId(id);

    const book = await this.bookModel
      .findOne({ _id: id, organization: orgId })
      .populate('organization');
    if (!book) {
      throw new BadRequestException('Book not found in this organization');
    }

    return book;
  }

  async updateBookById(
    id: string,
    updateData: UpdateQuery<UpdateBookDto>,
  ): Promise<Book> {
    validateObjectId(id);

    const updatedBook = await this.bookModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedBook) {
      throw new BadRequestException('Book not found');
    }

    return updatedBook;
  }

  async deleteBookById(id: string): Promise<Book> {
    validateObjectId(id);

    const deletedBook = await this.bookModel.findByIdAndDelete(id);

    if (!deletedBook) {
      throw new NotFoundException('Book not found');
    }

    return deletedBook;
  }

  async updateAvailableCopies(id: string, count: number): Promise<Book> {
    validateObjectId(id);

    const book = await this.bookModel.findById(id);
    if (!book) {
      throw new BadRequestException('Book not found');
    }

    const newAvailableCopies = book.availableCopies + count;
    if (newAvailableCopies < 0) {
      throw new BadRequestException('Not enough copies available');
    }

    book.availableCopies = newAvailableCopies;
    await book.save();

    return book;
  }
}
