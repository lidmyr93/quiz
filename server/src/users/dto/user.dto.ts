export class UserDto {
  readonly username: string;
  readonly email: string;
  readonly friends: FriendDto[];
  readonly id: string;
}

export class FriendDto {
  readonly username: string;
}
