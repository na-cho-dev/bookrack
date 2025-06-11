import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Organization } from 'src/organization/schemas/organization.shema';
import { User } from 'src/user/schemas/user.schema';

export type MembershipDocument = Membership & Document;
export enum MembershipRole {
  ADMIN = 'admin',
  STAFF = 'staff',
  USER = 'user',
}

@Schema()
export class Membership {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  user: Types.ObjectId;

  @Prop({ required: true })
  userEmail: string;

  @Prop({ type: Types.ObjectId, ref: Organization.name, required: true })
  organization: Types.ObjectId;

  @Prop({ enum: MembershipRole, required: true })
  role: MembershipRole;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const MembershipSchema = SchemaFactory.createForClass(Membership);

MembershipSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

MembershipSchema.set('toObject', {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  },
});
