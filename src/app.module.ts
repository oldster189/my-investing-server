import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PortfolioModule } from './portfolio/portfolio.module'
import { TransactionsModule } from './transactions/transactions.module'
import { StocksModule } from './stocks/stocks.module'
import { WatchListModule } from './watch-list/watch-list.module'
import { ExchangesModule } from './exchanges/exchanges.module'
import { AuthModule } from './auth/auth.module'
import { CurrencyModule } from './currency/currency.module'

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://cmoldster:k091hboAcR7**@cluster0.ja1bkxw.mongodb.net/myfund?retryWrites=true&w=majority',
    ),
    PortfolioModule,
    TransactionsModule,
    StocksModule,
    WatchListModule,
    CurrencyModule,
    ExchangesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
