import { Type } from 'class-transformer'
import { IsNotEmpty, ValidateNested } from 'class-validator'
import { CreateStocksRequest } from 'src/stocks/requests/create-stocks.request'

export class AddStockPortfolioRequest {
  @IsNotEmpty()
  _id: string

  @IsNotEmpty()
  @Type(() => CreateStocksRequest)
  @ValidateNested()
  stock: CreateStocksRequest
}
