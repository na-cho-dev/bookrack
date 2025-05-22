import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { User, UserDocument } from 'src/schemas/user.schema';
import { CreateUserDto } from 'src/user/dto/creat-user.dto';
import { UserService } from 'src/user/user.service';
import { TokenPayload } from './interface/token-payload.interface';
import { UserInterface } from './interface/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(userDto: CreateUserDto): Promise<User> {
    return await this.userService.create(userDto);
  }

  async login(user: UserInterface, response: Response) {
    const payload: TokenPayload = { sub: String(user._id), email: user.email };

    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_MS')}ms`,
    });

    const cookieOptions = {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
      sameSite: 'strict' as const,
      maxAge: 60 * 60 * 24 * 7, // 1 week
    };

    response.cookie('Authentication', token, cookieOptions);
  }

  async logout() {
    // Logout logic can go here
    return { message: 'User logged out successfully' };
  }

  async refreshToken() {
    // Refresh token logic can go here
    return { message: 'Token refreshed successfully' };
  }

  async forgotPassword() {
    // Forgot password logic can go here
    return { message: 'Password reset link sent successfully' };
  }

  async resetPassword() {
    // Reset password logic can go here
    return { message: 'Password reset successfully' };
  }
}
