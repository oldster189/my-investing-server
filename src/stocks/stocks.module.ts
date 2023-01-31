import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Stocks, StocksSchema } from './schemas/stocks.schema'
import { StocksController } from './stocks.controller'
import { StocksService } from './stocks.service'

@Module({
  imports: [MongooseModule.forFeature([{ name: Stocks.name, schema: StocksSchema }])],
  controllers: [StocksController],
  providers: [StocksService],
  exports: [StocksService],
})
export class StocksModule {}
