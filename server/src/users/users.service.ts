import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto, CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { UserDocument, User } from './schema/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('Users') private readonly userModel: Model<UserDocument>,
  ) {}

  async getUsers(): Promise<UserDto[]> {
    const users = await this.userModel.find().exec();
    return users.map(({ _id, username, email, friends }) => ({
      id: _id,
      username,
      email,
      friends,
    }));
  }

  async getUser(id: string): Promise<UserDto> {
    let user: User;
    try {
      user = await this.userModel.findById(id);
    } catch (e) {
      throw new NotFoundException('User not found');
    }
    const { _id, username, email, friends } = user;

    return { id: _id, username, email, friends } as UserDto;
  }

  async createUser(user: CreateUserDto) {
    const createdUser = await this.userModel.create(user);

    const { _id, username, email, friends } = createdUser;

    return { id: _id, username, email, friends } as UserDto;
  }

  async updateUser(id: string, user: UpdateUserDto) {
    const updatedUser = await this.userModel.findOneAndUpdate({ id }, user, {
      returnDocument: 'after',
    });
    const { _id, username, email, friends } = updatedUser;
    return { id: _id, username, email, friends } as UserDto;
  }

  async deleteUser(id: string) {
    return await this.userModel.findByIdAndDelete(id);
  }
}
