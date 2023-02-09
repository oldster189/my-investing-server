import { Expose, Type } from 'class-transformer'
import { StocksResponse } from 'src/stocks/responses/stocks.response'

export class WatchListResponse {
  @Expose()
  _id: string

  @Expose()
  name: string

  @Expose()
  stocks: StocksResponse[]
}

export class WatchListListResponse {
  @Expose()
  @Type(() => WatchListResponse)
  data: WatchListResponse[]
}
