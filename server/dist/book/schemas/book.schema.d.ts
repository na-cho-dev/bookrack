import mongoose, { Document } from 'mongoose';
export type BookDocument = Book & Document & {
    _id: mongoose.Types.ObjectId;
};
export declare class Book {
    isbn: string;
    title: string;
    author: string;
    genre: string;
    publishedYear: number;
    totalCopies: number;
    availableCopies: number;
}
export declare const BookSchema: mongoose.Schema<Book, mongoose.Model<Book, any, any, any, mongoose.Document<unknown, any, Book, any> & Book & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Book, mongoose.Document<unknown, {}, mongoose.FlatRecord<Book>, {}> & mongoose.FlatRecord<Book> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
