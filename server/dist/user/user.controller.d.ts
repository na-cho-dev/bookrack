import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getAllUsers(): Promise<import("./schemas/user.schema").User[]>;
    getUserById(id: string): Promise<import("./schemas/user.schema").User>;
    updateUser(id: string, updateUserDto: UpdateUserDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/user.schema").UserDocument, {}> & import("./schemas/user.schema").User & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    deleteUser(id: string): Promise<import("./schemas/user.schema").User>;
}
