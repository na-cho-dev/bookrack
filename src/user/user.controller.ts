import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JWTAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JWTAuthGuard)
  async getAllUsers() {
    const users = await this.userService.getAllUsers();
    return users;
  }
}
