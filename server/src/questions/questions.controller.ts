import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import {
  CreateQuestionDto,
  QuestionDto,
  UpdateQuestionDto,
} from './dto/question.dto';

@Controller('questions')
@UsePipes(new ValidationPipe({ transform: true, forbidUnknownValues: true }))
export class QuestionsController {
  constructor(private readonly service: QuestionsService) {}

  @Get('/all')
  async getAllQuestions(): Promise<QuestionDto[]> {
    return this.service.getAllQuestions();
  }

  @Get('/:id')
  async getQuestion(@Param('id') id: string): Promise<QuestionDto> {
    return this.service.getQuestion(id);
  }
  @Post()
  async create(@Body() question: CreateQuestionDto) {
    return this.service.createQuestion(question);
  }

  @Put(':id')
  async updateQuestion(
    @Param('id') id: string,
    @Body() updatedQuestion: UpdateQuestionDto,
  ): Promise<UpdateQuestionDto> {
    return await this.service.updateQuestion(id, updatedQuestion);
  }
}
