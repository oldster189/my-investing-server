import { Expose } from 'class-transformer'

export class StockInfo {
  @Expose()
  symbol: string

  @Expose()
  company: string

  @Expose()
  sector: string

  @Expose()
  industry: string

  @Expose()
  country: string

  @Expose()
  exchange: string
}
