import { StockInfo } from 'src/stocks/responses/stocks-info.response'

export interface FollowSuperInvestor {
  sa_ids: string
  ticker: string
  company?: string
  targetPrice: number
  currentPrice?: number
  differencePercent?: number
  info?: StockInfo
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
  volume: number
  last_time: Date
  market_cap: number
  info: string
  src: string
  updated_at: Date
}
