import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'
import { TransformReponseInterceptor } from './shared/interceptors/transform-reponse.interceptor'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.useGlobalInterceptors(new TransformReponseInterceptor())

  await app.listen(process.env.PORT || 3037)
}
bootstrap()
