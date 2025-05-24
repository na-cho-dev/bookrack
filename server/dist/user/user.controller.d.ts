import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getAllUsers(): Promise<import("./schemas/user.schema").User[]>;
    getUserById(id: string): Promise<import("./schemas/user.schema").User>;
}
