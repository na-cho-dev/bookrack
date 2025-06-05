import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JWTAuthGuard } from 'src/guards/jwt-auth.guard';
import { MembershipRoles } from 'src/decorators/membership-role.decorator';
import { MembershipRoleGuard } from 'src/guards/membership-role.guard';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { MembershipGuard } from 'src/guards/membership.guard';
import { MembershipRole } from 'src/membership/schemas/membership.schema';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Users')
@ApiCookieAuth('Authentication')
@Controller('users')
@UseGuards(JWTAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JWTAuthGuard)
  async getAllUsers() {
    const users = await this.userService.getAllUsers();
    return users;
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const user = await this.userService.getUserById(id);
    return user;
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser({ _id: id }, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    // TODO: Delete other related data like books, borrow records, etc.
    return this.userService.deleteUser(id);
  }
}
