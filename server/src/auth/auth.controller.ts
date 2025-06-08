import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Header,
  Headers,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/creat-user.dto';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { Response } from 'express';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { JWTRefreshAuthGuard } from 'src/guards/jwt-refresh-auth.guard';
import { UserResponse } from '../user/interface/user.interface';
import { JWTAuthGuard } from 'src/guards/jwt-auth.guard';
import { ApiBody, ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { CreateAdminDto } from 'src/user/dto/create-admin.dto';
import { MembershipGuard } from 'src/guards/membership.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: CreateAdminDto })
  @Post('admin/register')
  async registerAdmin(
    @Body() adminDto: CreateAdminDto,
    @Res() response: Response,
  ) {
    const user = await this.authService.registerAdmin(adminDto);
    await this.authService.login(user, response);

    response.json({
      message: 'Account Created Successfully',
      user,
    });
  }

  @ApiBody({ type: CreateUserDto })
  @Post('user/register')
  async registerUser(
    @Body() userDto: CreateUserDto,
    @Res() response: Response,
  ) {
    const user = await this.authService.registerUser(userDto);
    await this.authService.login(user, response);

    response.json({
      message: 'Account Created Successfully',
      user,
    });
  }

  @ApiBody({ type: LoginDto })
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@CurrentUser() user: UserResponse, @Res() response: Response) {
    const userResponse = await this.authService.login(user, response);

    response.json({
      message: 'Login successful',
      user: userResponse,
    });
  }

  @ApiCookieAuth('Authentication')
  @Get('current-user')
  @UseGuards(JWTAuthGuard)
  async getCurrentUser(
    @CurrentUser() user: UserResponse,
    @Headers('x-organization-id') orgId: string,
  ) {
    return await this.authService.getCurrentUser(user, orgId);
  }

  @ApiCookieAuth('Refresh')
  @Get('refresh')
  @UseGuards(JWTRefreshAuthGuard)
  async refreshToken(
    @CurrentUser() user: UserResponse,
    @Res() response: Response,
  ) {
    const refreshedUser = await this.authService.refreshToken(user, response);
    response.json({
      message: 'Token Refreshed',
      refreshedUser,
    });
  }

  @ApiCookieAuth('Authentication')
  @Get('logout')
  @UseGuards(JWTAuthGuard)
  async logout(@CurrentUser() user: UserResponse, @Res() response: Response) {
    await this.authService.logout(user, response);

    response.json({
      message: 'User logged out successfully',
    });
  }

  // @Post('forgot-password')
  // async forgotPassword() {
  //   return this.authService.forgotPassword();
  // }

  // @Post('reset-password')
  // async resetPassword() {
  //   return this.authService.resetPassword();
  // }
}
