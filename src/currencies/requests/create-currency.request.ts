import { PartialType } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional } from 'class-validator'

export class CreateCurrencyRequest {
  @IsNotEmpty()
  name: string

  @IsOptional()
  nameEn: string

  @IsNotEmpty()
  symbol: string

  @IsOptional()
  rate: number

  @IsNotEmpty()
  abbreviation: string

  @IsOptional()
  amount: number
}

export class UpdateCurrencyRequest extends PartialType(CreateCurrencyRequest) {
  @IsNotEmpty()
  _id: string
}
