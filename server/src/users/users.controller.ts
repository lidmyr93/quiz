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
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Get('/all')
  async getAll() {
    return this.service.getUsers();
  }

  @Get(':id')
  async get(@Param() params): Promise<UserDto> {
    return this.service.getUser(params.id);
  }

  @Post()
  async create(@Body() user: UserDto): Promise<any> {
    const createdUser = await this.service.createUser(user);
    return createdUser;
  }

  @Put()
  async update(
    @Param('id') id: string,
    @Body() user: UserDto,
  ): Promise<UserDto | HttpStatus> {
    if (!user) return HttpStatus.BAD_REQUEST;
    try {
      const updatedUser = await this.service.updateUser(id, user);

      return updatedUser;
    } catch (e) {
      return HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<HttpStatus.OK> {
    try {
      await this.service.deleteUser(id);

      return HttpStatus.OK;
    } catch (e) {
      return e;
    }
  }
}
