import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ unique: true, required: true })
  email: string;

  @Prop()
  name: string;

  @Prop({ required: true, select: false })
  password: string;

  // Role here can be optional, as it's handled per organization in Membership
  @Prop({ enum: ['admin', 'staff', 'user'], default: 'user' })
  globalRole: 'admin' | 'staff' | 'user'; // optional: can use this if needed globally

  @Prop({ select: false })
  refreshToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete (ret as any).__v;
    return ret;
  },
});

UserSchema.set('toObject', {
  transform: (doc, ret) => {
    delete (ret as any).__v;
    return ret;
  },
});
