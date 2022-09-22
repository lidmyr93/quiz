import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateQuestionDto,
  QuestionDto,
  UpdateQuestionDto,
} from './dto/question.dto';
import { QuestionDocument } from './schema/questions.schema';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel('Questions')
    private readonly questionModel: Model<QuestionDocument>,
  ) {}

  private async findQuestion(id: string): Promise<QuestionDto> {
    let question: QuestionDto;
    try {
      question = await this.questionModel.findById(id);
    } catch (e) {
      throw new NotFoundException('No question found with id' + id);
    }

    return question;
  }

  async getQuestion(id: string): Promise<QuestionDto> {
    return this.findQuestion(id);
  }

  async getAllQuestions(): Promise<QuestionDto[]> {
    const questions = await this.questionModel.find().exec();

    return questions.map(({ _id, question, category, answers }) => ({
      id: _id,
      question,
      category,
      answers,
    }));
  }
  async createQuestion(body: CreateQuestionDto): Promise<CreateQuestionDto> {
    const createdQuestion = await this.questionModel.create(body);
    const { _id, question, answers } = createdQuestion;
    return { id: _id, question, answers } as CreateQuestionDto;
  }

  async updateQuestion(
    id: string,
    updatedQuestion: UpdateQuestionDto,
  ): Promise<UpdateQuestionDto> {
    return await this.questionModel.findOneAndUpdate({ id }, updatedQuestion, {
      returnDocument: 'after',
    });
  }
}
