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
    message: 'Too short, minimum $constraint1',
  })
  @MaxLength(25, {
    message: 'Too longm maximum $constraint1',
  })
  readonly username: string;

  @IsEmail()
  readonly email: string;

  @Allow()
  readonly friends: FriendDto[];

  readonly id: string;
}
export class CreateUserDto extends OmitType(UserDto, ['id'] as const) {}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class FriendDto {
  @IsNotEmpty()
  readonly id: string;
}
