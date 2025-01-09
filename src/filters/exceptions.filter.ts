import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    let httpStatus: number;
    let responseBody: any;

    if (exception instanceof BadRequestException) {
      // Handle validation errors
      const exceptionResponse = exception.getResponse();
      httpStatus = exception.getStatus();

      // Check if the response contains validation error details
      const validationErrors: string[] =
        this.extractValidationErrors(exceptionResponse);

      responseBody = {
        statusCode: httpStatus,
        message: 'Validation failed',
        errors: validationErrors,
        timestamp: new Date().toISOString()
      };

      this.logger.error('Validation Error:', validationErrors);
    } else if (exception instanceof HttpException) {
      // Handle other known HttpExceptions
      httpStatus = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      responseBody = {
        statusCode: httpStatus,
        message:
          typeof exceptionResponse === 'string'
            ? exceptionResponse
            : (exceptionResponse as any).message || 'An error occurred',
        timestamp: new Date().toISOString()
      };

      this.logger.error('HttpException:', exceptionResponse);
    } else {
      // Handle unknown exceptions
      httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
      responseBody = {
        statusCode: httpStatus,
        message: 'Internal server error',
        timestamp: new Date().toISOString()
      };

      if (this.isExceptionObject(exception)) {
        this.logger.error(exception.cause ? exception.cause : exception.stack);
      }
    }

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }

  private isExceptionObject(err: any): err is Error {
    return typeof err === 'object' && err !== null && 'message' in err;
  }

  private extractValidationErrors(response: any): string[] {
    // If response contains validation errors, process them
    if (response && Array.isArray(response.message)) {
      return response.message.flatMap((error: any) => {
        if (typeof error === 'string') {
          return [error]; // Handle basic string errors
        }
        if (typeof error === 'object' && error.constraints) {
          return Object.values(error.constraints); // Extract and return only the messages
        }
        return []; // Ignore unexpected structures
      });
    }
    return typeof response === 'string' ? [response] : []; // Fallback for simple or unknown structures
  }
}
