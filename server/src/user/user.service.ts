import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { CreateUserDto } from './dto/creat-user.dto';
import { hash } from 'bcrypt';
import { UserInput, UserResponse } from './interface/user.interface';
import { validateObjectId } from 'src/common/utils/validate-objectid.utils';
import { User, UserDocument } from './schemas/user.schema';
import { CreateAdminDto } from './dto/create-admin.dto';
import { OrganizationService } from 'src/organization/organization.service';
import { MembershipService } from 'src/membership/membership.service';
import { MembershipRole } from 'src/membership/schemas/membership.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly organizationService: OrganizationService,
    private readonly membershipService: MembershipService,
  ) {}

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

  async createAdmin(adminDto: CreateAdminDto): Promise<UserResponse> {
    const email = adminDto.email.toLowerCase();

    // Find or create user
    let user = await this.userModel.findOne({ email });
    if (!user) {
      user = await this.userModel.create({
        email,
        name: adminDto.name,
        password: await hash(adminDto.password, 10),
      });
    }

    // Create organization and membership
    const organization = await this.organizationService.createOrganization(
      {
        name: adminDto.organizationName,
        description: adminDto.organizationDescription,
      },
      String(user._id),
    );

    // Create membership
    // await this.membershipService.createMembership(
    //   String(user._id),
    //   String(organization._id),
    //   MembershipRole.ADMIN,
    // );

    const memberships = await this.membershipService.findAllByUserId(
      String(user._id),
    );

    const userResponse: UserResponse = {
      _id: String(user._id),
      email: user.email,
      name: user.name,
      memberships,
    };

    return userResponse;
  }

  async createUser(userDto: CreateUserDto): Promise<UserResponse> {
    const email = userDto.email.toLowerCase();
    let user = await this.userModel.findOne({ email });

    if (!user) {
      user = new this.userModel({
        email,
        name: userDto.name,
        password: await hash(userDto.password, 10),
      });
      user = await user.save();
    }

    const organization = await this.organizationService.findOne({
      code: userDto.organizationCode,
    });
    if (!organization) {
      throw new NotFoundException('Organization not found.');
    }

    const existingMembership = await this.membershipService.findOne({
      user: user._id,
      organization: organization._id,
    });

    if (existingMembership) {
      throw new ConflictException(
        'User is already a member of this organization.',
      );
    }

    await this.membershipService.createMembership(
      String(user._id),
      String(organization._id),
      MembershipRole.MEMBER,
    );

    const memberships = await this.membershipService.findAllByUserId(
      String(user._id),
    );

    const userResponse: UserResponse = {
      _id: String(user._id),
      email: user.email,
      name: user.name,
      memberships,
    };

    return userResponse;
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
    query: FilterQuery<UserInput>,
    updateData: UpdateQuery<User>,
  ) {
    const user = await this.userModel.findOneAndUpdate(query, updateData, {
      new: true,
    });
    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async deleteUser(id: string): Promise<User> {
    validateObjectId(id);

    const user = await this.userModel.findByIdAndDelete(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
