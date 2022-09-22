import {
  IsNotEmpty,
  MaxLength,
  MinLength,
  IsArray,
  ValidateNested,
  IsBoolean,
  ArrayNotEmpty,
  ArrayMinSize,
  ArrayMaxSize,
} from 'class-validator';
import { PartialType, OmitType } from '@nestjs/mapped-types';

export class QuestionDto {
  @IsNotEmpty({ message: 'Question is missing' })
  readonly question: string;

  @MinLength(1, { message: 'Unknown category' })
  @MaxLength(2, { message: 'Unknown category' })
  readonly category: number;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(4)
  @ArrayMaxSize(4)
  @ValidateNested()
  readonly answers: AnswersDto[];

  readonly id: string;
}

export class CreateQuestionDto extends QuestionDto {}
export class UpdateQuestionDto extends PartialType(CreateQuestionDto) {}
export class AnswersDto {
  @IsNotEmpty({ message: 'Answer is missing' })
  readonly answer: string;

  @IsBoolean()
  readonly isCorrect: boolean;
}
