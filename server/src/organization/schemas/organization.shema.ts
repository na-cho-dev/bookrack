import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type OrganizationDocument = Organization & Document;

@Schema()
export class Organization {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, unique: true })
  code: string;

  @Prop({ type: 'ObjectId', ref: 'User', required: true })
  owner: Types.ObjectId;
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);

OrganizationSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete (ret as any).__v;
    return ret;
  },
});

OrganizationSchema.set('toObject', {
  transform: (doc, ret) => {
    delete (ret as any).__v;
    return ret;
  },
});
