import { Expose, Type } from 'class-transformer'
import { StocksResponse } from 'src/stocks/responses/stocks.response'

export class TransactionResponse {
  @Expose()
  portfolioId: string

  @Expose()
  type: string // Sell or Buy

  @Expose()
  @Type(() => StocksResponse)
  stocks: StocksResponse[]

  @Expose()
  amount: number // จำนวนเงิน ที่ทำรายการ

  @Expose()
  dateOfOrder: Date
}

export class TransactionListResponse {
  @Expose()
  @Type(() => TransactionResponse)
  data: TransactionResponse[]
}
