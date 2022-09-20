import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Get('/all')
  async getAll() {
    return this.service.getUsers();
  }

  @Get(':id')
  async get(@Param() params) {
    console.log('params', params.id);
    return this.service.getUser(params.id);
  }

  @Post()
  async create(@Body() user: User) {
    const createdUser = await this.service.createUser(user);
    return createdUser;
  }

  @Put()
  async update(@Body() user: User) {
    if (!user) return HttpStatus.BAD_REQUEST;
    try {
      const updatedUser = await this.service.updateUser(user);

      return updatedUser;
    } catch (e) {
      return HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }

  @Delete(':id')
  deleteUser(@Param() params) {
    try {
      this.service.deleteUser(params.id);

      return HttpStatus.OK;
    } catch (e) {
      return e;
    }
  }
}
