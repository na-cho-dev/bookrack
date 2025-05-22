import {
  Body,
  Controller,
  Get,
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
import { UserInterface } from '../user/interface/user.interface';
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
      user,
    });
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@CurrentUser() user: UserInterface, @Res() response: Response) {
    await this.authService.login(user, response);

    response.json({
      message: 'Login successful',
      user,
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
      refreshedUser,
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
