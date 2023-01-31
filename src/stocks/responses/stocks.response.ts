import { Expose, Type } from 'class-transformer'
import { DividendResponse } from './dividen.response'

export class StocksResponse {
  @Expose()
  _id: string

  @Expose()
  symbol: string

  @Expose()
  company: string

  @Expose()
  type: string

  @Expose()
  sector: string

  @Expose()
  industry: string

  @Expose()
  exchange: string

  @Expose()
  country: string

  @Expose()
  price: number // ราคาหุ้น

  @Expose()
  share: number // จำนวนหุ้น

  @Expose()
  @Type(() => DividendResponse)
  dividend: DividendResponse

  @Expose()
  customType: string
}

export class StocksListResponse {
  @Expose()
  @Type(() => StocksResponse)
  data: StocksResponse[]
}
