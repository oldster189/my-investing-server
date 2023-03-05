import { OmitType, PartialType } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsArray, IsNotEmpty, IsOptional, ValidateNested } from 'class-validator'
import { CreateStocksRequest, UpdateStocksRequest } from 'src/stocks/requests/create-stocks.request'

export class CreatePortfolioRequest {
  @IsNotEmpty()
  dbname: string

  @IsNotEmpty()
  name: string

  @IsOptional()
  @IsArray()
  @Type(() => CreateStocksRequest)
  @ValidateNested()
  stocks: CreateStocksRequest[]
}

export class UpdatePortfolioRequest extends PartialType(OmitType(CreatePortfolioRequest, ['dbname', 'stocks'])) {
  @IsNotEmpty()
  _id: string

  @IsOptional()
  @IsArray()
  @Type(() => UpdateStocksRequest)
  @ValidateNested()
  stocks: UpdateStocksRequest[]
}
