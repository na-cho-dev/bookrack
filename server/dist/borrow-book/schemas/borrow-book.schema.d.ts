import mongoose, { Document } from 'mongoose';
import { Book } from 'src/book/schemas/book.schema';
import { User } from 'src/user/schemas/user.schema';
export type BorrowBookDocument = BorrowBook & Document;
export type BorrowBookStatus = 'pending' | 'borrowed' | 'pending-return' | 'returned';
export declare class BorrowBook {
    user: User;
    book: Book;
    requestAt?: Date;
    borrowDate?: Date;
    dueDate?: Date;
    returnDate?: Date;
    status: BorrowBookStatus;
}
export declare const BorrowBookSchema: mongoose.Schema<BorrowBook, mongoose.Model<BorrowBook, any, any, any, mongoose.Document<unknown, any, BorrowBook, any> & BorrowBook & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, BorrowBook, mongoose.Document<unknown, {}, mongoose.FlatRecord<BorrowBook>, {}> & mongoose.FlatRecord<BorrowBook> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
