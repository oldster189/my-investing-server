import { Expose, Type } from 'class-transformer'

export class CurrencyResponse {
  @Expose()
  _id: string

  @Expose()
  name: string

  @Expose()
  nameEn: string

  @Expose()
  symbol: string

  @Expose()
  rate: number

  @Expose()
  abbreviation: string

  @Expose()
  amount: number
}

export class CurrencyListResponse {
  @Expose()
  @Type(() => CurrencyResponse)
  data: CurrencyResponse[]
}
