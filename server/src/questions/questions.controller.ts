import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { Question } from './dto/question.dto';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly service: QuestionsService) {}

  @Get('/all')
  async getAllQuestions(): Promise<Question[]> {
    return this.service.getAllQuestions();
  }

  @Get('/:id')
  async getQuestion(@Param('id') id: string): Promise<Question> {
    return this.service.getQuestion(id);
  }
  @Post()
  async create(@Body() question: Question) {
    return this.service.createQuestion(question);
  }

  @Put(':id')
  async updateQuestion(
    @Param('id') id: string,
    @Body() updatedQuestion: Question,
  ): Promise<Question> {
    return await this.service.updateQuestion(id, updatedQuestion);
  }
}
