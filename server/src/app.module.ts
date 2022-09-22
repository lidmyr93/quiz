import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { LoggerMiddleware } from './middleware/logger';
import { QuestionsModule } from './questions/questions.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    QuestionsModule,
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGODB_CONNECTION,
      }),
    }),
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(QuestionsModule, UsersModule);
  }
}
