import { CustomStocksType } from 'src/shared/enums/custom-stocks-type.enum'
import { PartialType } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsEnum, IsNotEmpty, IsOptional, ValidateNested } from 'class-validator'
import { StocksType } from 'src/shared/enums/stocks-type.enum'
import { DividendRequest } from './dividen.request'

export class CreateStocksRequest {
  @IsNotEmpty()
  symbol: string

  @IsOptional()
  company: string

  @IsOptional()
  @IsEnum(StocksType)
  type: string

  @IsOptional()
  sector: string

  @IsOptional()
  industry: string

  @IsOptional()
  country: string

  @IsOptional()
  exchange: string

  @IsOptional()
  price: number // ราคาหุ้น

  @IsOptional()
  share: number // จำนวนหุ้น

  @IsOptional()
  @Type(() => DividendRequest)
  @ValidateNested()
  dividend: DividendRequest

  @IsOptional()
  @IsEnum(CustomStocksType)
  customType: string

  @IsOptional()
  logoid: string
}

export class UpdateStocksRequest extends PartialType(CreateStocksRequest) {
  @IsOptional()
  _id: string
}
