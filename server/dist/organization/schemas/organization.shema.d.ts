import { Document } from 'mongoose';
export type OrganizationDocument = Organization & Document;
export declare class Organization {
    name: string;
    description: string;
    code: string;
    owner: string;
}
export declare const OrganizationSchema: import("mongoose").Schema<Organization, import("mongoose").Model<Organization, any, any, any, Document<unknown, any, Organization, any> & Organization & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Organization, Document<unknown, {}, import("mongoose").FlatRecord<Organization>, {}> & import("mongoose").FlatRecord<Organization> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
