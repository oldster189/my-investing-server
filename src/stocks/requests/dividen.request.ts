import { IsOptional } from 'class-validator'

export class DividendRequest {
  @IsOptional()
  _id: string

  @IsOptional()
  dividendYield: number

  @IsOptional()
  annualPayout: number

  @IsOptional()
  payoutRatio: number

  @IsOptional()
  fifthYearGrowthRate: number

  @IsOptional()
  dividendGrowth: number

  @IsOptional()
  amount: number

  @IsOptional()
  exDivDate: Date

  @IsOptional()
  payoutDate: Date

  @IsOptional()
  divFrequency: number
}
