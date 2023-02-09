import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Stocks, StocksSchema } from 'src/stocks/schemas/stocks.schema'
import { WatchList, WatchListSchema } from './schemas/watch-list.schema'
import { WatchListsController } from './watch-lists.controller'
import { WatchListsService } from './watch-lists.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WatchList.name, schema: WatchListSchema },
      { name: Stocks.name, schema: StocksSchema },
    ]),
  ],
  controllers: [WatchListsController],
  providers: [WatchListsService],
  exports: [WatchListsService],
})
export class WatchListsModule {}
