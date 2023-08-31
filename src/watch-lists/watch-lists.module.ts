import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Stocks, StocksSchema } from 'src/stocks/schemas/stocks.schema'
import { WatchList, WatchListSchema } from './schemas/watch-list.schema'
import { WatchListsController } from './watch-lists.controller'
import { WatchListsService } from './watch-lists.service'
import { StocksModule } from 'src/stocks/stocks.module'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WatchList.name, schema: WatchListSchema },
      { name: Stocks.name, schema: StocksSchema },
    ]),
    StocksModule,
  ],
  controllers: [WatchListsController],
  providers: [WatchListsService],
  exports: [WatchListsService],
})
export class WatchListsModule {}
