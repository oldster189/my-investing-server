export interface ExchangeRate {
  exchangeRateDate: string
  data: ExchangeRateData[]
}

export interface ExchangeRateData {
  round: number
  time: string
  detail: ExchangeRateDetail[]
}

export interface ExchangeRateDetail {
  flagCode: string
  currencyCode: string
  currencyName: string
  buyingRate: number
  sellingRate: number
}

export interface ExchangeRate {
  code: string
  msg: string
  base: string
  rates: { [key: string]: number }
}
