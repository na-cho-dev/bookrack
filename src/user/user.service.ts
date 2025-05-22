import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email: email.toLowerCase() });
  }

  async validateUser(email: string, password: string) {
    const user = await this.findByEmail(email);
    if (user && (await compare(password, user.password))) {
      return user;
    }

    return null;
  }
}
