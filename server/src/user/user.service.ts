import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { CreateUserDto } from './dto/creat-user.dto';
import { hash } from 'bcrypt';
import {
  UserInterface,
  UserResponseInterface,
} from './interface/user.interface';
import { validateObjectId } from 'src/common/utils/validate-objectid.utils';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getUser(
    query: FilterQuery<User>,
    selectPassword = false,
    selectRefreshToken = false,
  ) {
    const selectFields = [
      selectPassword ? '+password' : '-password',
      selectRefreshToken ? '+refreshToken' : '-refreshToken',
    ].join(' ');

    const user = await this.userModel.findOne(query).select(selectFields);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async create(userDto: CreateUserDto): Promise<UserResponseInterface> {
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

    const savedUser = await user.save();
    const { password, ...secureUser } = savedUser.toObject();

    return {
      ...secureUser,
      _id: secureUser._id?.toString(),
    };
  }

  async getUserById(id: string): Promise<User> {
    validateObjectId(id);

    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.userModel.find();
    if (!users || users.length === 0) {
      throw new NotFoundException('No users found');
    }

    return users;
  }

  async updateUser(
    query: FilterQuery<UserInterface>,
    updateData: UpdateQuery<User>,
  ) {
    const user = await this.userModel.findOneAndUpdate(query, updateData, {
      new: true,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
