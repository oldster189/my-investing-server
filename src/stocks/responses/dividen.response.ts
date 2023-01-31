import { Expose } from 'class-transformer'

export class DividendResponse {
  @Expose()
  _id: string

  @Expose()
  dividendYield: number

  @Expose()
  annualPayout: number

  @Expose()
  payoutRatio: number

  @Expose()
  fifthYearGrowthRate: number

  @Expose()
  dividendGrowth: number

  @Expose()
  amount: number

  @Expose()
  exDivDate: Date

  @Expose()
  payoutDate: Date

  @Expose()
  divFrequency: number
}
