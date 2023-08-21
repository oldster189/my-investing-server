import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { json, urlencoded } from 'express'
import * as compression from 'compression'
import helmet from 'helmet'
import { AppModule } from './app.module'
import { TransformReponseInterceptor } from './shared/interceptors/transform-reponse.interceptor'
import { ValidationPipe } from '@nestjs/common'
import { TransformResponseExceptionFilter } from './shared/exception-fiters/transform-response-exception.filter'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  app.useGlobalInterceptors(new TransformReponseInterceptor())
  app.useGlobalFilters(new TransformResponseExceptionFilter())

  app.enableCors()
  app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
  app.use(compression())
  app.use(json({ limit: '50mb' }))
  app.use(urlencoded({ limit: '50mb', extended: true }))
  await app.listen(process.env.PORT || 3037)
}
bootstrap()
