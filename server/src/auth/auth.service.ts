import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from 'src/user/dto/creat-user.dto';
import { UserService } from 'src/user/user.service';
import { TokenPayload } from './interface/token-payload.interface';
import {
  UserInterface,
  UserResponseInterface,
} from '../user/interface/user.interface';
import { compare, hash } from 'bcrypt';
import { EnvConfig } from 'src/common/config/env.config';
import { JWTCookieUtil } from 'src/common/utils/jwt-cookie.utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly envConfig: EnvConfig,
    private readonly userService: UserService,
    private readonly jwtCookieService: JWTCookieUtil,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.getUser({ email }, true);
    if (user && (await compare(password, user.password))) {
      // Remove password from user object before returning
      const { password, ...secureUser } = user.toObject();
      return secureUser;
    }

    return null;
  }

  async verifyUserRefreshToken(token: string, userId: string) {
    try {
      const user = await this.userService.getUser({ _id: userId }, false, true);
      const authenticated = await compare(token, user.refreshToken);
      if (!authenticated) {
        throw new NotFoundException('Refresh token not found');
      }

      const { refreshToken, ...secureUser } = user.toObject();
      return secureUser;
    } catch (error) {
      throw new BadRequestException('Refresh Token Error');
    }
  }

  async register(userDto: CreateUserDto): Promise<UserResponseInterface> {
    return await this.userService.create(userDto);
  }

  async login(user: UserInterface, response: Response) {
    const payload: TokenPayload = { sub: String(user._id), email: user.email };

    const accessToken = await this.jwtCookieService.signToken(
      payload,
      'access',
    );
    const refreshToken = await this.jwtCookieService.signToken(
      payload,
      'refresh',
    );

    // Save refresh token in the database
    await this.userService.updateUser(
      { _id: user._id },
      { refreshToken: await hash(refreshToken, 10) },
    );

    // Set cookies in the response
    this.jwtCookieService.setAuthCookie(response, accessToken, 'access');
    this.jwtCookieService.setAuthCookie(response, refreshToken, 'refresh');

    return user;
  }

  async refreshToken(user: UserInterface, response: Response) {
    const payload: TokenPayload = { sub: String(user._id), email: user.email };
    const accessToken = await this.jwtCookieService.signToken(
      payload,
      'access',
    );

    // Set new access token in the response
    this.jwtCookieService.setAuthCookie(response, accessToken, 'access');

    return user;
  }

  async logout(user: UserInterface, response: Response) {
    // Delete refresh token from the database
    await this.userService.updateUser(
      { _id: user._id },
      { refreshToken: null },
    );

    return this.jwtCookieService.clearAuthCookie(response);
  }

  // async forgotPassword() {
  //   // Forgot password logic can go here
  //   return { message: 'Password reset link sent successfully' };
  // }

  // async resetPassword() {
  //   // Reset password logic can go here
  //   return { message: 'Password reset successfully' };
  // }
}
