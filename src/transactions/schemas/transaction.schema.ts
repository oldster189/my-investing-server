import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose'
import { TransactionStatus } from 'src/shared/enums/transaction-status.enum'
import { TransactionType } from 'src/shared/enums/transaction-type.enum'
import { Stocks, StocksSchema } from 'src/stocks/schemas/stocks.schema'

export type TransactionDocument = HydratedDocument<Transaction>

@Schema({ timestamps: true })
export class Transaction {
  @Prop({
    required: true,
    type: MongooseSchema.Types.ObjectId,
    ref: 'Portfolio',
  })
  portfolioId: Types.ObjectId

  @Prop({ enum: TransactionType })
  type: string // Sell or Buy

  @Prop({ type: StocksSchema })
  stocks: Stocks

  @Prop()
  amount: number // จำนวนเงิน ที่ทำรายการ

  @Prop({ enum: TransactionStatus })
  status: string

  @Prop()
  dateOfOrder: Date
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction)
