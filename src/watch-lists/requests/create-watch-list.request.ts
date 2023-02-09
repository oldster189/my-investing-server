import { PartialType } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsArray, IsNotEmpty, IsOptional, ValidateNested } from 'class-validator'
import { CreateStocksRequest } from 'src/stocks/requests/create-stocks.request'

export class CreateWatchListRequest {
  @IsNotEmpty()
  name: string

  @IsOptional()
  @IsArray()
  @Type(() => CreateStocksRequest)
  @ValidateNested()
  stocks: CreateStocksRequest[]
}

export class UpdateWatchListRequest extends PartialType(CreateWatchListRequest) {
  @IsNotEmpty()
  _id: string
}
