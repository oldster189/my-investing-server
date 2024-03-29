import { Expose } from 'class-transformer'
import { StockInfo } from 'src/stocks/responses/stocks-info.response'
import { StocksResponse } from 'src/stocks/responses/stocks.response'

export interface FollowSuperInvestor {
  sa_ids: string
  ticker: string
  company?: string
  targetPrice: number
  currentPrice?: number
  futurePrice?: number
  futureDifferencePercent?: number
  differencePercent?: number
  info?: StockInfo
}

export class FollowSuperInvestorResponse {
  @Expose()
  sa_ids: string

  @Expose()
  ticker: string

  @Expose()
  company: string

  @Expose()
  targetPrice: number

  @Expose()
  currentPrice: number

  @Expose()
  differencePercent: number

  @Expose()
  info: StocksResponse[]
}

export interface RealTimeQuote {
  real_time_quotes: Quote[]
}

export interface Quote {
  sa_id: number
  sa_slug: string
  symbol: string
  high: number
  low: number
  open: number
  close: number
  prev_close: number
  last: number
  ext_price?: number
  volume: number
  last_time: Date
  market_cap: number
  info: string
  src: string
  updated_at: Date
}
