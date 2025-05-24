import { AddBookDto } from './dto/create-book.dto';
import { BookService } from './book.service';
import { UpdateBookDto } from './dto/update-book.dto';
export declare class BookController {
    private readonly bookService;
    constructor(bookService: BookService);
    addBook(bookDto: AddBookDto): Promise<{
        message: string;
        book: import("./schemas/book.schema").Book;
    }>;
    getAllBooks(): Promise<{
        message: string;
        books: import("./schemas/book.schema").Book[];
    }>;
    getBookById(id: string): Promise<{
        message: string;
        book: import("./schemas/book.schema").Book | null;
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
