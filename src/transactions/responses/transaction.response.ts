import { Expose, Type } from 'class-transformer'
import { CurrencyResponse } from 'src/currencies/responses/currency.response'
import { TransactionStatus } from 'src/shared/enums/transaction-status.enum'
import { TransactionType } from 'src/shared/enums/transaction-type.enum'
import { StocksResponse } from 'src/stocks/responses/stocks.response'

export class TransactionResponse {
  @Expose()
  _id: string

  @Expose()
  portfolioId: string

  @Expose()
  type: TransactionType // Sell or Buy

  @Expose()
  @Type(() => StocksResponse)
  stocks: StocksResponse[]

  @Expose()
  @Type(() => CurrencyResponse)
  payments: CurrencyResponse[]

  @Expose()
  commission: number

  @Expose()
  tax: number

  @Expose()
  totalAmount: number

  @Expose()
  status: TransactionStatus

  @Expose()
  dateOfOrder: Date
}

export class TransactionListResponse {
  @Expose()
  @Type(() => TransactionResponse)
  data: TransactionResponse[]
}
