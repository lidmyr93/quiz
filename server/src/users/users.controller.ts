import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserDto, CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
@UsePipes(new ValidationPipe({ transform: true, forbidUnknownValues: true }))
export class UsersController {
  constructor(private service: UsersService) {}

  @Get('/all')
  async getAll(): Promise<UserDto[]> {
    return this.service.getUsers();
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<UserDto> {
    return this.service.getUser(id);
  }

  @Post()
  async create(@Body() user: CreateUserDto): Promise<UserDto> {
    const createdUser = await this.service.createUser(user);
    return createdUser;
  }

  @Put()
  async update(
    @Param('id') id: string,
    @Body() user: UpdateUserDto,
  ): Promise<UserDto | HttpStatus> {
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
