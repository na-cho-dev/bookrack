import { BorrowBookService } from './borrow-book.service';
import { CreateBorrowBookDto } from './dto/create-borrow-book.dto';
import { UpdateBorrowBookDto } from './dto/update-borrow-book.dto';
import { UserResponse } from 'src/user/interface/user.interface';
export declare class BorrowBookController {
    private readonly borrowBookService;
    constructor(borrowBookService: BorrowBookService);
    createBorrowRecord(borrowBookDto: CreateBorrowBookDto, user: UserResponse, orgId: string): Promise<{
        message: string;
        data: import("./schemas/borrow-book.schema").BorrowBook;
    }>;
    getBorrowRecordsByStatus(orgId: string, status?: string): Promise<{
        message: string;
        borrowRecords: import("./schemas/borrow-book.schema").BorrowBook[];
    }>;
    approveBorrowRequest(id: string, updateData: UpdateBorrowBookDto, orgId: string): Promise<{
        message: string;
        borrowedBookRequest: import("./schemas/borrow-book.schema").BorrowBook;
    }>;
    returnBook(id: string, orgId: string): Promise<{
        message: string;
        returnedBook: import("./schemas/borrow-book.schema").BorrowBook;
    }>;
    approveBookReturn(id: string, orgId: string): Promise<{
        message: string;
        returnedBook: import("./schemas/borrow-book.schema").BorrowBook;
    }>;
    getBorrowRecordsByUserId(userId: string): Promise<{
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
