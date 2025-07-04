import { BorrowBookStatus } from '../schemas/borrow-book.schema';
export declare class UpdateBorrowBookDto {
    user: string;
    book: string;
    requestedAt: string;
    borrowDate: string;
    dueDate: string;
    returnDate?: Date;
    status: BorrowBookStatus;
}
