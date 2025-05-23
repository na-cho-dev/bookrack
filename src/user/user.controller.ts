import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JWTAuthGuard } from 'src/guards/jwt-auth.guard';
import { Roles } from 'src/decorators/user-roles.decorator';
import { RolesGuard } from 'src/guards/user-roles.guard';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@ApiCookieAuth('Authentication')
@Controller('users')
@UseGuards(JWTAuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles('admin')
  async getAllUsers() {
    const users = await this.userService.getAllUsers();
    return users;
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const user = await this.userService.getUserById(id);
    return user;
  }
}
