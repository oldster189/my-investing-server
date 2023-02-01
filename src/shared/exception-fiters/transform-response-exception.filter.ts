import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common'
import { Response } from 'express'

@Catch()
export class TransformResponseExceptionFilter implements ExceptionFilter {
  logger = new Logger('TransformResponseExceptionFilter')
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    // NOTE: log exception
    if (exception instanceof HttpException) {
      const status = exception.getStatus()
      const message = (<any>exception.getResponse()).message
      this.logger.debug(message)
      response.status(status).json({ errorCode: status, message, success: false })
    } else {
      const status = HttpStatus.INTERNAL_SERVER_ERROR
      const message = exception['message'] ? exception['message'] : 'internal server error'
      this.logger.debug(message)
      response.status(status).json({ errorCode: status, message, success: false })
    }
  }
}
