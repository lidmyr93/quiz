import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

export type QuestionDocument = Question & Document;

@Schema()
export class Question {
  @Prop()
  question: string;

  @Prop()
  category: string;

  @Prop()
  answers: Answers[];
}
@Schema()
export class Answers {
  @Prop()
  answer: string;

  @Prop()
  isCorrect: boolean;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
