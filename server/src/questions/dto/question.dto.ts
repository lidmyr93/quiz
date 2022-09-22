export class Question {
  readonly question: string;
  readonly category: string;
  readonly answers: AnswersDto[];
}

export class AnswersDto {
  readonly answer: string;
  readonly isCorrect: boolean;
}
