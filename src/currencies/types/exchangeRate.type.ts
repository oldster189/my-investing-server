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
