import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from 'src/user/dto/creat-user.dto';
import { UserService } from 'src/user/user.service';
import { TokenPayload } from './interface/token-payload.interface';
import {
  UserCreationInput,
  UserResponse,
} from '../user/interface/user.interface';
import { compare, hash } from 'bcrypt';
import { EnvConfig } from 'src/common/config/env.config';
import { JWTCookieUtil } from 'src/common/utils/jwt-cookie.utils';
import { CreateAdminDto } from 'src/user/dto/create-admin.dto';
import { MembershipService } from 'src/membership/membership.service';
import { OrganizationService } from 'src/organization/organization.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly envConfig: EnvConfig,
    private readonly userService: UserService,
    private readonly membershipService: MembershipService,
    private readonly jwtCookieService: JWTCookieUtil,
    private readonly organizationService: OrganizationService,
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

  async registerAdmin(adminDto: CreateAdminDto): Promise<UserResponse> {
    return await this.userService.createAdmin(adminDto);
  }

  async registerUser(userDto: CreateUserDto): Promise<UserResponse> {
    return await this.userService.createUser(userDto);
  }

  async login(user: UserResponse, response: Response): Promise<UserResponse> {
    const payload: TokenPayload = {
      sub: String(user._id),
      email: user.email,
    };

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

    const memberships = await this.membershipService.findAllByUserId(user._id);

    const userResponse: UserResponse = {
      _id: String(user._id),
      email: user.email,
      name: user.name,
      memberships,
    };

    return userResponse;
  }

  async getCurrentUser(user: UserResponse, orgId: string): Promise<any> {
    if (!orgId) {
      // No organization context -> return basic user info
      const memberships = await this.membershipService.findAllByUserId(
        user._id,
      );

      return {
        message: 'Logged in successfully (basic)',
        user: {
          _id: user._id,
          email: user.email,
          name: user.name,
          memberships,
        },
      };
    }

    // Organization context -> validate membership
    const membership = await this.membershipService.findByUserAndOrganization(
      user._id,
      orgId,
    );

    if (!membership) {
      // User is not a member of this org anymore, return basic info
      const memberships = await this.membershipService.findAllByUserId(
        user._id,
      );
      return {
        message: 'Logged in successfully (basic)',
        user: {
          _id: user._id,
          email: user.email,
          name: user.name,
          memberships,
        },
      };
    }

    return {
      message: 'Logged in successfully (with organization)',
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        membership,
      },
    };
  }

  async refreshToken(user: UserResponse, response: Response) {
    const payload: TokenPayload = {
      sub: String(user._id),
      email: user.email,
    };
    const accessToken = await this.jwtCookieService.signToken(
      payload,
      'access',
    );

    // Set new access token in the response
    this.jwtCookieService.setAuthCookie(response, accessToken, 'access');

    return user;
  }

  async logout(user: UserResponse, response: Response) {
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
