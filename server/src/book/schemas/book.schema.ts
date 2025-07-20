import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type BookDocument = Book & Document & { _id: mongoose.Types.ObjectId };

@Schema()
export class Book {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    required: true,
  })
  organization: mongoose.Types.ObjectId;

  @Prop({ required: true })
  isbn: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  genre: string;

  @Prop({ required: true })
  publishedYear: number;

  @Prop({ required: true, default: 0 })
  totalCopies: number;

  @Prop({ required: true })
  availableCopies: number;
}

export const BookSchema = SchemaFactory.createForClass(Book);

BookSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete (ret as any).__v;
    return ret;
  },
});

BookSchema.set('toObject', {
  transform: (doc, ret) => {
    delete (ret as any).__v;
    return ret;
  },
});
