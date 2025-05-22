import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/creat-user.dto';
import { UserService } from 'src/user/user.service';
import { User } from 'src/schemas/user.schema';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { Request, Response } from 'express';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { JWTRefreshAuthGuard } from 'src/guards/jwt-refresh-auth.guard';
import { UserInterface } from './interface/user.interface';
import { get } from 'http';
import { JWTAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() userDto: CreateUserDto, @Res() response: Response) {
    const user = await this.authService.register(userDto);
    await this.authService.login(user, response);

    response.json({
      message: 'Account Created Successfully',
      user: {
        id: user._id,
        email: user.email,
      },
    });
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@CurrentUser() user: UserInterface, @Res() response: Response) {
    await this.authService.login(user, response);

    response.json({
      message: 'Login successful',
      user: {
        id: user._id,
        email: user.email,
      },
    });
  }

  @Get('refresh')
  @UseGuards(JWTRefreshAuthGuard)
  async refreshToken(
    @CurrentUser() user: UserInterface,
    @Res() response: Response,
  ) {
    const refreshedUser = await this.authService.refreshToken(user, response);
    response.json({
      message: 'Token Refreshed',
      refreshedUser: {
        id: refreshedUser._id,
        email: refreshedUser.email,
      },
    });
  }

  @Get('logout')
  @UseGuards(JWTAuthGuard)
  async logout(@CurrentUser() user: UserInterface, @Res() response: Response) {
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
