import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookDocument = Book & Document;

@Schema()
export class Book {
  @Prop({ unique: true, required: true })
  isbn: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  genre: string;

  @Prop({ required: true })
  publishedYear: number;

  @Prop({ default: false })
  isBorrowed: boolean;
}

export const BookSchema = SchemaFactory.createForClass(Book);

BookSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret.__v;
    return ret;
  },
});
