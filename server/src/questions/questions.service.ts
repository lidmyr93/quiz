import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question } from './dto/question.dto';
import { QuestionDocument } from './schema/questions.schema';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel('Questions')
    private readonly questionModel: Model<QuestionDocument>,
  ) {}

  private async findQuestion(id: string): Promise<Question> {
    let question;
    try {
      question = await this.questionModel.findById(id);
    } catch (e) {
      throw new NotFoundException('No question found with id' + id);
    }

    return question;
  }

  async getQuestion(id: string) {
    return this.findQuestion(id);
  }

  async getAllQuestions(): Promise<Question[]> {
    const questions = await this.questionModel.find().exec();

    return questions;
  }
  async createQuestion(body: Question): Promise<Question> {
    const question = await this.questionModel.create(body);

    return question;
  }

  async updateQuestion(
    id: string,
    updatedQuestion: Question,
  ): Promise<Question> {
    return await this.questionModel.findOneAndUpdate({ id }, updatedQuestion, {
      returnDocument: 'after',
    });
  }
}
