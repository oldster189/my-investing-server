import { Expose, Type } from 'class-transformer'
import { CustomStocksType } from 'src/shared/enums/custom-stocks-type.enum'
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
  customType: CustomStocksType

  @Expose()
  logoid: string
}

export class StocksListResponse {
  @Expose()
  @Type(() => StocksResponse)
  data: StocksResponse[]
}
