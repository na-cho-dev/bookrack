import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrganizationDocument = Organization & Document;

@Schema()
export class Organization {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, unique: true })
  code: string;

  @Prop({ required: true })
  owner: string;
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);

OrganizationSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

OrganizationSchema.set('toObject', {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  },
});
