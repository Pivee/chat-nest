import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class RequestLoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpContext = context.switchToHttp();
    const request: Request = httpContext.getRequest();
    const response: Response = httpContext.getResponse();
    const timeBefore = Date.now();

    return next.handle().pipe(
      tap(() => {
        Logger.log(
          `${request.method} ${request.path} ${response.statusCode} +${
            Date.now() - timeBefore
          }ms`,
          'HttpRequest',
        );
      }),
    );
  }
}
