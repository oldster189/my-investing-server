import { PartialType } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsEnum, IsNotEmpty, IsOptional, ValidateNested } from 'class-validator'
import { UpdateCurrencyRequest } from 'src/currencies/requests/create-currency.request'
import { TransactionStatus } from 'src/shared/enums/transaction-status.enum'
import { TransactionType } from 'src/shared/enums/transaction-type.enum'

export class CreateExchangeRequest {
  @IsOptional()
  orderId: string

  @IsNotEmpty()
  dbname: string

  @IsNotEmpty()
  @IsEnum(TransactionType)
  type: string // Sell or Buy

  @IsNotEmpty()
  @Type(() => UpdateCurrencyRequest)
  @ValidateNested()
  from: UpdateCurrencyRequest

  @IsNotEmpty()
  @Type(() => UpdateCurrencyRequest)
  @ValidateNested()
  to: UpdateCurrencyRequest

  @IsOptional()
  @IsEnum(TransactionStatus)
  status: string

  @IsOptional()
  dateOfOrder: Date
}

export class UpdateExchangeRequest extends PartialType(CreateExchangeRequest) {
  @IsNotEmpty()
  _id: string
}
