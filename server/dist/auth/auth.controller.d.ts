import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/creat-user.dto';
import { Response } from 'express';
import { UserResponse } from '../user/interface/user.interface';
import { CreateAdminDto } from 'src/user/dto/create-admin.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    registerAdmin(adminDto: CreateAdminDto, response: Response): Promise<void>;
    registerUser(userDto: CreateUserDto, response: Response): Promise<void>;
    login(user: UserResponse, response: Response): Promise<void>;
    getCurrentUser(user: UserResponse, orgId: string): Promise<any>;
    refreshToken(user: UserResponse, response: Response): Promise<void>;
    logout(user: UserResponse, response: Response): Promise<void>;
}
