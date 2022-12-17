import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  UserDto,
  CreateUserDto,
  UpdateUserDto,
  UserLoginDto,
} from './dto/user.dto';
import { UserDocument, User } from './schema/user.schema';
import * as bcrypt from 'bcrypt';
import { identity } from 'rxjs';

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

  async getUserByAttr(attr: Object): Promise<User> {
    console.log('attr', attr);
    let user;
    try {
      user = await this.userModel.find(attr).exec();
    } catch (e) {
      throw new NotFoundException('User not found');
    }

    const { _id, username, email, friends, password } = user[0];

    return { username, email, friends, password } as User;
  }

  async createUser(user: CreateUserDto) {
    const { password, ...rest } = user;
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);

    const createdUser = await this.userModel.create({
      password: hash,
      ...rest,
    });

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

  async login(credentials: UserLoginDto) {
    const { username, password } = credentials;
    const savedCredentials = await this.getUserByAttr({ username });

    const isMatch = await bcrypt.compare(password, savedCredentials?.password);
    return isMatch ? HttpStatus.OK : HttpStatus.BAD_REQUEST;
  }
}
