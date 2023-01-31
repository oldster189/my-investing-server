import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ExchangesController } from './exchanges.controller'
import { ExchangesService } from './exchanges.service'
import { Exchange, ExchangeSchema } from './schemas/exchange.schema'

@Module({
  imports: [MongooseModule.forFeature([{ name: Exchange.name, schema: ExchangeSchema }])],
  controllers: [ExchangesController],
  providers: [ExchangesService],
  exports: [ExchangesService],
})
export class ExchangesModule {}
