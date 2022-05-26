import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RequestLoggerInterceptor } from './interceptors/request-logger.interceptor';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestLoggerInterceptor,
    },
    ChatGateway,
  ],
})
export class AppModule {}
