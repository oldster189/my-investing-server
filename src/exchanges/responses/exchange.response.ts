import { Expose, Type } from 'class-transformer'
import { CurrencyResponse } from 'src/currency/responses/currency.response'

export class ExchangeResponse {
  @Expose()
  _id: string

  @Expose()
  orderId: string

  @Expose()
  portfolioId: string

  @Expose()
  type: string

  @Expose()
  @Type(() => CurrencyResponse)
  from: CurrencyResponse

  @Expose()
  @Type(() => CurrencyResponse)
  to: CurrencyResponse

  @Expose()
  status: string

  @Expose()
  dateOfOrder: Date
}

export class ExchangeListResponse {
  @Expose()
  @Type(() => ExchangeResponse)
  data: ExchangeResponse[]
}
