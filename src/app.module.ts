import { ConfigModule, ConfigService } from '@nestjs/config'
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
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'production' ? '.env.production' : '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
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
