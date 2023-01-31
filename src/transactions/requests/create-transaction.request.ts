import { PartialType } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsEnum, IsNotEmpty, ValidateNested } from 'class-validator'
import { TransactionType } from 'src/shared/enums/transaction-type.enum'
import { UpdateStocksRequest } from 'src/stocks/requests/create-stocks.request'

export class CreateTransactionRequest {
  @IsNotEmpty()
  portfolioId: string

  @IsNotEmpty()
  @IsEnum(TransactionType)
  type: string // Sell or Buy

  @IsNotEmpty()
  @Type(() => UpdateStocksRequest)
  @ValidateNested()
  stocks: UpdateStocksRequest

  @IsNotEmpty()
  amount: number // จำนวนเงิน ที่ทำรายการ

  @IsNotEmpty()
  dateOfOrder: Date
}

export class UpdateTransactionRequest extends PartialType(CreateTransactionRequest) {
  @IsNotEmpty()
  _id: string
}
