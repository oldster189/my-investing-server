import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose'
import { Currency, CurrencySchema } from 'src/currencies/schemas/currency.schema'
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

  @Prop({ enum: TransactionType, default: TransactionType.BUY })
  type: string // Sell or Buy

  @Prop({ type: StocksSchema })
  stocks: Stocks // ราคาหุ้น ตอนซื้อ และจำนวนหุ้น

  @Prop({ type: [CurrencySchema] })
  payments: Currency[] // จำนวนเงิน ที่ทำรายการ thb and usd

  @Prop()
  commission: number // ค่าคอมมิชชัน ค่าบริการ

  @Prop()
  tax: number // ภาษี

  @Prop()
  totalAmount: number // รวมเงินบาท

  @Prop({ enum: TransactionStatus })
  status: string

  @Prop()
  dateOfOrder: Date
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction)
