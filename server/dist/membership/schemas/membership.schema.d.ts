import { Document, Types } from 'mongoose';
export type MembershipDocument = Membership & Document;
export declare enum MembershipRole {
    ADMIN = "admin",
    STAFF = "staff",
    USER = "user"
}
export declare class Membership {
    user: Types.ObjectId;
    userEmail: string;
    organization: Types.ObjectId;
    role: MembershipRole;
    createdAt: Date;
}
export declare const MembershipSchema: import("mongoose").Schema<Membership, import("mongoose").Model<Membership, any, any, any, Document<unknown, any, Membership, any> & Membership & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Membership, Document<unknown, {}, import("mongoose").FlatRecord<Membership>, {}> & import("mongoose").FlatRecord<Membership> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
