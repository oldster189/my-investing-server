import { Type } from 'class-transformer'
import { IsNotEmpty, ValidateNested } from 'class-validator'
import { UpdateStocksRequest } from 'src/stocks/requests/create-stocks.request'

export class AddStockPortfolioRequest {
  @IsNotEmpty()
  _id: string

  @IsNotEmpty()
  @Type(() => UpdateStocksRequest)
  @ValidateNested()
  stock: UpdateStocksRequest
}
