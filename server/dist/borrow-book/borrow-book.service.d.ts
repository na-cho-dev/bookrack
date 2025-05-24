import { BorrowBook, BorrowBookDocument } from './schemas/borrow-book.schema';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { CreateBorrowBookDto } from './dto/create-borrow-book.dto';
import { UpdateBorrowBookDto } from './dto/update-borrow-book.dto';
import { BookService } from 'src/book/book.service';
export declare class BorrowBookService {
    private readonly borrowBookModel;
    private readonly bookService;
    constructor(borrowBookModel: Model<BorrowBookDocument>, bookService: BookService);
    getBorrowBookQuery(query?: FilterQuery<BorrowBook>): Promise<BorrowBook[]>;
    createBorrowRecord(borrowBook: CreateBorrowBookDto): Promise<BorrowBook>;
    returnBook(id: string): Promise<BorrowBook>;
    approveBookReturn(id: string): Promise<BorrowBook>;
    getAllBorrowRecords(): Promise<BorrowBook[]>;
    getBorrowRecordsByUserId(userId: string): Promise<BorrowBook[]>;
    getBorrowRecordsByBookId(bookId: string): Promise<BorrowBook[]>;
    getBorrowRecordById(id: string): Promise<BorrowBook>;
    updateBorrowRecordById(id: string, updateData: UpdateQuery<UpdateBorrowBookDto>): Promise<BorrowBook>;
    deleteBorrowRecordById(id: string): Promise<BorrowBook>;
    getOverdueBooks(): Promise<BorrowBook[]>;
    getUserOverdueBooks(userId: string): Promise<BorrowBook[]>;
}
