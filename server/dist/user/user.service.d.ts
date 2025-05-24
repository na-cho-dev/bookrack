import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { CreateUserDto } from './dto/creat-user.dto';
import { UserInterface, UserResponseInterface } from './interface/user.interface';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    getUser(query: FilterQuery<User>, selectPassword?: boolean, selectRefreshToken?: boolean): Promise<import("mongoose").Document<unknown, {}, UserDocument, {}> & User & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    create(userDto: CreateUserDto): Promise<UserResponseInterface>;
    getUserById(id: string): Promise<User>;
    getAllUsers(): Promise<User[]>;
    updateUser(query: FilterQuery<UserInterface>, updateData: UpdateQuery<User>): Promise<import("mongoose").Document<unknown, {}, UserDocument, {}> & User & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
