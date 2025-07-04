import { BorrowBook, BorrowBookDocument } from './schemas/borrow-book.schema';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { CreateBorrowBookDto } from './dto/create-borrow-book.dto';
import { UpdateBorrowBookDto } from './dto/update-borrow-book.dto';
import { BookService } from 'src/book/book.service';
import { BookDocument } from 'src/book/schemas/book.schema';
export declare class BorrowBookService {
    private readonly borrowBookModel;
    private readonly bookService;
    constructor(borrowBookModel: Model<BorrowBookDocument>, bookService: BookService);
    getBorrowBookQuery(query?: FilterQuery<BorrowBook>): Promise<BorrowBook[]>;
    validateBookOrganization(bookId: string, orgId: string): Promise<BookDocument>;
    createBorrowRecord(borrowBook: CreateBorrowBookDto, userId: string, orgId: string): Promise<BorrowBook>;
    approveBorrowRequest(id: string, updateData: UpdateBorrowBookDto, orgId: string): Promise<BorrowBook>;
    returnBook(id: string, orgId: string): Promise<BorrowBook>;
    approveBookReturn(id: string, orgId: string): Promise<BorrowBook>;
    getBorrowRecordsByStatus(orgId: string, status?: string): Promise<BorrowBook[]>;
    getBorrowRecordsByUserId(userId: string): Promise<BorrowBook[]>;
    getBorrowRecordById(id: string): Promise<BorrowBook>;
    updateBorrowRecordById(id: string, updateData: UpdateQuery<UpdateBorrowBookDto>): Promise<BorrowBook>;
    deleteBorrowRecordById(id: string): Promise<BorrowBook>;
    getOverdueBooks(): Promise<BorrowBook[]>;
    getUserOverdueBooks(userId: string): Promise<BorrowBook[]>;
}
