import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Stocks, StocksSchema } from 'src/stocks/schemas/stocks.schema'
import { StocksModule } from 'src/stocks/stocks.module'
import { PortfolioController } from './portfolio.controller'
import { PortfolioService } from './portfolio.service'
import { Portfolio, PortfolioSchema } from './schemas/portfolio.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Portfolio.name, schema: PortfolioSchema },
      { name: Stocks.name, schema: StocksSchema },
    ]),
    StocksModule,
  ],
  controllers: [PortfolioController],
  providers: [PortfolioService],
  exports: [PortfolioService],
})
export class PortfolioModule {}
