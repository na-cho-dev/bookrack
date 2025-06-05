import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/creat-user.dto';
import { Response } from 'express';
import { UserResponse } from '../user/interface/user.interface';
import { CreateAdminDto } from 'src/user/dto/create-admin.dto';
import { MembershipService } from 'src/membership/membership.service';
export declare class AuthController {
    private readonly authService;
    private readonly membershipService;
    constructor(authService: AuthService, membershipService: MembershipService);
    registerAdmin(adminDto: CreateAdminDto, response: Response): Promise<void>;
    registerUser(userDto: CreateUserDto, response: Response): Promise<void>;
    login(user: UserResponse, response: Response): Promise<void>;
    getCurrentUser(user: UserResponse, orgId: string): Promise<any>;
    refreshToken(user: UserResponse, response: Response): Promise<void>;
    logout(user: UserResponse, response: Response): Promise<void>;
}
