import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { Currency, CurrencySchema } from 'src/currencies/schemas/currency.schema'
import { TransactionStatus } from 'src/shared/enums/transaction-status.enum'
import { TransactionType } from 'src/shared/enums/transaction-type.enum'

export type ExchangeDocument = HydratedDocument<Exchange>

@Schema({ timestamps: true })
export class Exchange {
  @Prop({ required: true, unique: true })
  orderId: string

  @Prop({ required: true })
  dbname: string

  // Sell or Buy
  @Prop({ enum: TransactionType })
  type: string

  @Prop({ type: CurrencySchema })
  from: Currency

  @Prop({ type: CurrencySchema })
  to: Currency

  @Prop({ enum: TransactionStatus })
  status: string

  @Prop()
  dateOfOrder: Date
}

export const ExchangeSchema = SchemaFactory.createForClass(Exchange)
