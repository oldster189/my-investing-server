import { IsOptional } from 'class-validator'

export class ExchangeQuery {
  @IsOptional()
  type: string

  @IsOptional()
  startDate?: string

  @IsOptional()
  endDate?: string
}
