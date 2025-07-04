import { AddBookDto } from './dto/create-book.dto';
import { BookService } from './book.service';
import { UpdateBookDto } from './dto/update-book.dto';
export declare class BookController {
    private readonly bookService;
    constructor(bookService: BookService);
    addBook(bookDto: AddBookDto, orgId: string): Promise<{
        message: string;
        book: import("./schemas/book.schema").Book;
    }>;
    getAllBooks(orgId: string): Promise<{
        message: string;
        books: import("./schemas/book.schema").Book[];
    }>;
    getAvailableBooks(orgId: string): Promise<{
        message: string;
        books: import("./schemas/book.schema").Book[];
    }>;
    getBookById(id: string, orgId: string): Promise<{
        message: string;
        book: import("./schemas/book.schema").BookDocument | null;
    }>;
    updateBook(id: string, bookDto: UpdateBookDto): Promise<{
        message: string;
        book: import("./schemas/book.schema").Book;
    }>;
    deleteBook(id: string): Promise<{
        message: string;
        book: import("./schemas/book.schema").Book;
    }>;
}
