import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Book } from 'src/book/schemas/book.schema';
import { User } from 'src/user/schemas/user.schema';

export type BorrowBookDocument = BorrowBook & Document;
export type BorrowBookStatus =
  | 'pending'
  | 'borrowed'
  | 'pending-return'
  | 'returned';

@Schema()
export class BorrowBook {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true })
  book: Book;

  @Prop()
  requestAt?: Date;

  @Prop()
  borrowDate?: Date;

  @Prop()
  dueDate?: Date;

  @Prop()
  returnDate?: Date;

  @Prop({ default: 'pending' })
  status: BorrowBookStatus;
}

export const BorrowBookSchema = SchemaFactory.createForClass(BorrowBook);

BorrowBookSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

BorrowBookSchema.set('toObject', {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  },
});
