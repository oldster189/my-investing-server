import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { StocksType } from 'src/shared/enums/stocks-type.enum'
import { Dividend, DividendSchema } from './dividend.schema'

export type StocksDocument = HydratedDocument<Stocks>

@Schema({ timestamps: true })
export class Stocks {
  @Prop({ required: true, unique: true })
  symbol: string

  @Prop()
  company: string

  // common / etf
  @Prop({ enum: StocksType })
  type: string

  @Prop()
  sector: string

  @Prop()
  industry: string

  @Prop()
  exchange: string

  @Prop()
  country: string

  @Prop()
  price: number // ราคาหุ้น

  @Prop()
  share: number // จำนวนหุ้น

  @Prop({ type: DividendSchema })
  dividend: Dividend

  @Prop()
  customType: string
}

export const StocksSchema = SchemaFactory.createForClass(Stocks)
