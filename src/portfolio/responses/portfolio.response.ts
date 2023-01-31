import { Expose, Type } from 'class-transformer'
import { StocksResponse } from 'src/stocks/responses/stocks.response'

export class PortfolioResponse {
  @Expose()
  _id: string

  @Expose()
  dbname: string

  @Expose()
  name: string

  @Expose()
  stocks: StocksResponse[]

  @Expose()
  totalInvested: number
}

export class PortfolioListResponse {
  @Expose()
  @Type(() => PortfolioResponse)
  data: PortfolioResponse[]
}
