import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/creat-user.dto';
import { UserService } from 'src/user/user.service';
import { User } from 'src/schemas/user.schema';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { Request, Response } from 'express';
import { CurrentUser } from 'src/decorators/current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

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
  async login(@CurrentUser() user: User, @Res() response: Response) {
    await this.authService.login(user, response);

    response.json({
      message: 'Login successful',
      user,
    });
  }

  @Post('logout')
  async logout() {
    return this.authService.logout();
  }
  //
  @Post('refresh-token')
  async refreshToken() {
    return this.authService.refreshToken();
  }

  @Post('forgot-password')
  async forgotPassword() {
    return this.authService.forgotPassword();
  }

  @Post('reset-password')
  async resetPassword() {
    return this.authService.resetPassword();
  }
}
