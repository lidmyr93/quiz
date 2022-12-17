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
import {
  UserDto,
  CreateUserDto,
  UpdateUserDto,
  UserLoginDto,
} from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
@UsePipes(new ValidationPipe({ transform: true, forbidUnknownValues: true }))
export class UsersController {
  constructor(private service: UsersService) {}

  @Post('/login')
  async login(@Body() credentials: UserLoginDto): Promise<any> {
    console.log('login');
    return this.service.login(credentials);
  }

  @Get('/all')
  async getAll(): Promise<UserDto[]> {
    console.log('get all');
    return this.service.getUsers();
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<UserDto> {
    console.log('get user');
    return this.service.getUser(id);
  }

  @Post()
  async create(@Body() user: CreateUserDto): Promise<HttpStatus> {
    console.log('create user');
    await this.service.createUser(user);

    return HttpStatus.CREATED;
  }

  @Put()
  async update(
    @Param('id') id: string,
    @Body() user: UpdateUserDto,
  ): Promise<UserDto | HttpStatus> {
    console.log('update');
    try {
      const updatedUser = await this.service.updateUser(id, user);

      return updatedUser;
    } catch (e) {
      return HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<HttpStatus.OK> {
    console.log('delete');
    try {
      await this.service.deleteUser(id);

      return HttpStatus.OK;
    } catch (e) {
      return e;
    }
  }
}
