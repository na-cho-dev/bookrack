"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./schemas/user.schema");
const bcrypt_1 = require("bcrypt");
const validate_objectid_utils_1 = require("../common/utils/validate-objectid.utils");
let UserService = class UserService {
    userModel;
    constructor(userModel) {
        this.userModel = userModel;
    }
    async getUser(query, selectPassword = false, selectRefreshToken = false) {
        const selectFields = [
            selectPassword ? '+password' : '-password',
            selectRefreshToken ? '+refreshToken' : '-refreshToken',
        ].join(' ');
        const user = await this.userModel.findOne(query).select(selectFields);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async create(userDto) {
        const existingUser = await this.userModel.findOne({ email: userDto.email });
        if (existingUser) {
            throw new common_1.ConflictException('User with this email already exists.');
        }
        const email = userDto.email.toLowerCase();
        const user = new this.userModel({
            ...userDto,
            email,
            password: await (0, bcrypt_1.hash)(userDto.password, 10),
        });
        const savedUser = await user.save();
        const { password, ...secureUser } = savedUser.toObject();
        return {
            ...secureUser,
            _id: secureUser._id?.toString(),
        };
    }
    async getUserById(id) {
        (0, validate_objectid_utils_1.validateObjectId)(id);
        const user = await this.userModel.findById(id);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async getAllUsers() {
        const users = await this.userModel.find();
        if (!users || users.length === 0) {
            throw new common_1.NotFoundException('No users found');
        }
        return users;
    }
    async updateUser(query, updateData) {
        const user = await this.userModel.findOneAndUpdate(query, updateData, {
            new: true,
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
//# sourceMappingURL=user.service.js.map