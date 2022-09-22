import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;
@Schema()
export class User {
  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  friends: Friend[];

  _id: string;
}

@Schema()
export class Friend {
  @Prop()
  id: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
