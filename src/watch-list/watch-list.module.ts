import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Stocks, StocksSchema } from 'src/stocks/schemas/stocks.schema'
import { WatchList, WatchListSchema } from './schemas/watch-list.schema'
import { WatchListController } from './watch-list.controller'
import { WatchListService } from './watch-list.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WatchList.name, schema: WatchListSchema },
      { name: Stocks.name, schema: StocksSchema },
    ]),
  ],
  controllers: [WatchListController],
  providers: [WatchListService],
  exports: [WatchListService],
})
export class WatchListModule {}
