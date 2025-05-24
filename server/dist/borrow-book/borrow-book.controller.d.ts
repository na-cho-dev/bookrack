import { BorrowBookService } from './borrow-book.service';
import { CreateBorrowBookDto } from './dto/create-borrow-book.dto';
import { UpdateBorrowBookDto } from './dto/update-borrow-book.dto';
export declare class BorrowBookController {
    private readonly borrowBookService;
    constructor(borrowBookService: BorrowBookService);
    createBorrowRecord(borrowBookDto: CreateBorrowBookDto): Promise<{
        message: string;
        data: import("./schemas/borrow-book.schema").BorrowBook;
    }>;
    getAllBorrowRecords(): Promise<{
        message: string;
        borrowRecords: import("./schemas/borrow-book.schema").BorrowBook[];
    }>;
    returnBook(id: string): Promise<{
        message: string;
        returnedBook: import("./schemas/borrow-book.schema").BorrowBook;
    }>;
    approveBookReturn(id: string): Promise<{
        message: string;
        returnedBook: import("./schemas/borrow-book.schema").BorrowBook;
    }>;
    getBorrowRecordsByUserId(userId: string): Promise<{
        message: string;
        borrowRecords: import("./schemas/borrow-book.schema").BorrowBook[];
    }>;
    getBorrowRecordsByBookId(bookId: string): Promise<{
        message: string;
        borrowRecords: import("./schemas/borrow-book.schema").BorrowBook[];
    }>;
    getUserOverdueBooks(userId: string): Promise<{
        message: string;
        overdueBooks: import("./schemas/borrow-book.schema").BorrowBook[];
    }>;
    getOverdueBooks(): Promise<{
        message: string;
        overdueBooks: import("./schemas/borrow-book.schema").BorrowBook[];
    }>;
    getBorrowRecordsById(id: string): Promise<{
        message: string;
        borrowRecord: import("./schemas/borrow-book.schema").BorrowBook;
    }>;
    updateBorrowRecordById(id: string, updateData: UpdateBorrowBookDto): Promise<{
        message: string;
        updatedBorrowRecord: import("./schemas/borrow-book.schema").BorrowBook;
    }>;
    deleteBorrowRecordById(id: string): Promise<{
        message: string;
        deletedBorrowRecord: import("./schemas/borrow-book.schema").BorrowBook;
    }>;
}
