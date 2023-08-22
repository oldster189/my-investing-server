import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Transaction, TransactionSchema } from './schemas/transaction.schema'
import { TransactionsController } from './transactions.controller'
import { TransactionsService } from './transactions.service'
import { ExchangesModule } from 'src/exchanges/exchanges.module'
import { StocksModule } from 'src/stocks/stocks.module'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Transaction.name, schema: TransactionSchema }]),
    ExchangesModule,
    StocksModule,
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService],
  exports: [TransactionsService],
})
export class TransactionsModule {}
