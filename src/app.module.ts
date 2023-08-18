import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PortfoliosModule } from './portfolios/portfolios.module'
import { TransactionsModule } from './transactions/transactions.module'
import { StocksModule } from './stocks/stocks.module'
import { WatchListsModule } from './watch-lists/watch-lists.module'
import { ExchangesModule } from './exchanges/exchanges.module'
import { AuthModule } from './auth/auth.module'
import { CurrenciesModule } from './currencies/currencies.module'
import { TasksModule } from './tasks/tasks.module'
import { ScheduleModule } from '@nestjs/schedule'

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://cmoldster:k091hboAcR7**@cluster0.ja1bkxw.mongodb.net/myfund?retryWrites=true&w=majority',
    ),
    ScheduleModule.forRoot(),
    PortfoliosModule,
    TransactionsModule,
    StocksModule,
    WatchListsModule,
    CurrenciesModule,
    ExchangesModule,
    AuthModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
