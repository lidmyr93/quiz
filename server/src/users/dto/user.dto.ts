import {
  Allow,
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';
import { PartialType, OmitType } from '@nestjs/mapped-types';
export class UserDto {
  @MinLength(6, {
    message: 'Username too short, minimum $constraint1',
  })
  @MaxLength(25, {
    message: 'Username too long maximum $constraint1',
  })
  readonly username: string;

  @IsEmail()
  readonly email: string;

  @Allow()
  readonly friends: FriendDto[];

  readonly id: string;
}
export class CreateUserDto extends OmitType(UserDto, ['id'] as const) {
  @IsNotEmpty()
  @MinLength(6, {
    message: 'Password too short, minimum $constraint1',
  })
  @MaxLength(25, {
    message: 'Password too long, minimum $constraint1',
  })
  readonly password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class UserLoginDto extends OmitType(CreateUserDto, [
  'friends',
  'email',
] as const) {}

export class FriendDto {
  @IsNotEmpty()
  readonly id: string;
}
