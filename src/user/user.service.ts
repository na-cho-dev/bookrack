import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/creat-user.dto';
import { compare, hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(userDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userModel.findOne({ email: userDto.email });
    if (existingUser) {
      throw new ConflictException('User with this email already exists.');
    }

    const email = userDto.email.toLowerCase();
    const user = new this.userModel({
      ...userDto,
      email,
      password: await hash(userDto.password, 10),
    });

    return user.save();
  }

  async getUser(query: FilterQuery<User>) {
    const user = await this.userModel.findOne(query);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async getAllUsers() {
    const users = await this.userModel.find();
    if (!users || users.length === 0) {
      throw new NotFoundException('No users found');
    }

    return users;
  }

  async updateUser(query: FilterQuery<User>, updateData: UpdateQuery<User>) {
    const user = await this.userModel.findOneAndUpdate(query, updateData, {
      new: true,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
