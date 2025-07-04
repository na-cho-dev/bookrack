import { Book, BookDocument } from './schemas/book.schema';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { AddBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
export declare class BookService {
    private readonly bookModel;
    constructor(bookModel: Model<BookDocument>);
    getBookQuery(query?: FilterQuery<Book>): Promise<Book[]>;
    addBook(bookData: AddBookDto, orgId: string): Promise<Book>;
    getAllBooksByOrg(orgId: string): Promise<Book[]>;
    getAvailableBooksByOrg(orgId: string): Promise<Book[]>;
    getBookById(id: string, orgId: string): Promise<BookDocument | null>;
    updateBookById(id: string, updateData: UpdateQuery<UpdateBookDto>): Promise<Book>;
    deleteBookById(id: string): Promise<Book>;
    updateAvailableCopies(id: string, count: number): Promise<Book>;
}
