import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionsController } from './questions.controller';
import { QuestionSchema } from './schema/questions.schema';
import { QuestionsService } from './questions.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Questions', schema: QuestionSchema }]),
  ],
  controllers: [QuestionsController],
  providers: [QuestionsService],
})
export class QuestionsModule {}
