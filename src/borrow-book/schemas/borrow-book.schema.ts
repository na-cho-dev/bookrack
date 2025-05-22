import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Book } from 'src/book/schemas/book.schema';
import { User } from 'src/user/schemas/user.schema';

export type BorrowBookDocument = BorrowBook & Document;
export type BorrowBookStatus = 'borrowed' | 'returned';

@Schema()
export class BorrowBook {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true })
  book: Book;

  @Prop({ required: true })
  borrowDate: Date;

  @Prop({ required: true })
  dueDate: Date;

  @Prop()
  returnDate?: Date;

  @Prop({ default: 'borrowed' })
  status: BorrowBookStatus;
}

export const BorrowBookSchema = SchemaFactory.createForClass(BorrowBook);

BorrowBookSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret.__v;
    return ret;
  },
});
