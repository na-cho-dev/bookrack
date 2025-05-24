import { UserRole } from 'src/user/schemas/user.schema';
export declare class CreateUserDto {
    email: string;
    name?: string;
    password: string;
    role?: UserRole;
}
