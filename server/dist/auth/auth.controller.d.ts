import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/creat-user.dto';
import { Response } from 'express';
import { UserInterface } from '../user/interface/user.interface';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(userDto: CreateUserDto, response: Response): Promise<void>;
    login(user: UserInterface, response: Response): Promise<void>;
    refreshToken(user: UserInterface, response: Response): Promise<void>;
    logout(user: UserInterface, response: Response): Promise<void>;
}
