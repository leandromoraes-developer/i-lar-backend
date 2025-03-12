import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = HttpStatus.INTERNAL_SERVER_ERROR;

    const errorCode = 400;

    const message = exception.message
      ? exception.message
      : 'Internal server error';

    const error = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      message,
      errorCode,
    };

    console.log(error);

    response.status(status).json(error);
  }
}
