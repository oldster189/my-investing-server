import { PartialType } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsEnum, IsNotEmpty, IsOptional, ValidateNested } from 'class-validator'
import { UpdateCurrencyRequest } from 'src/currencies/requests/create-currency.request'
import { TransactionStatus } from 'src/shared/enums/transaction-status.enum'
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
  @Type(() => UpdateStocksRequest)
  @ValidateNested()
  payments: UpdateCurrencyRequest[] // จำนวนเงิน ที่ทำรายการ

  @IsOptional()
  commission: number

  @IsOptional()
  tax: number

  @IsNotEmpty()
  totalAmount: number

  @IsOptional()
  @IsEnum(TransactionStatus)
  status: string

  @IsNotEmpty()
  dateOfOrder: Date
}

export class UpdateTransactionRequest extends PartialType(CreateTransactionRequest) {
  @IsNotEmpty()
  _id: string
}
