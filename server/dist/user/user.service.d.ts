import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { CreateUserDto } from './dto/creat-user.dto';
import { UserInput, UserResponse } from './interface/user.interface';
import { User, UserDocument } from './schemas/user.schema';
import { CreateAdminDto } from './dto/create-admin.dto';
import { OrganizationService } from 'src/organization/organization.service';
import { MembershipService } from 'src/membership/membership.service';
export declare class UserService {
    private userModel;
    private readonly organizationService;
    private readonly membershipService;
    constructor(userModel: Model<UserDocument>, organizationService: OrganizationService, membershipService: MembershipService);
    getUser(query: FilterQuery<User>, selectPassword?: boolean, selectRefreshToken?: boolean): Promise<import("mongoose").Document<unknown, {}, UserDocument, {}> & User & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    createAdmin(adminDto: CreateAdminDto): Promise<UserResponse>;
    createUser(userDto: CreateUserDto): Promise<UserResponse>;
    getUserById(id: string): Promise<User>;
    getAllUsers(): Promise<User[]>;
    updateUser(query: FilterQuery<UserInput>, updateData: UpdateQuery<User>): Promise<import("mongoose").Document<unknown, {}, UserDocument, {}> & User & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    deleteUser(id: string): Promise<User>;
}
