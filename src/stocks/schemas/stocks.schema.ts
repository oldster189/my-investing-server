import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { CustomStocksType } from 'src/shared/enums/custom-stocks-type.enum'
import { StocksType } from 'src/shared/enums/stocks-type.enum'
import { Dividend, DividendSchema } from './dividend.schema'

export type StocksDocument = HydratedDocument<Stocks>

@Schema({ timestamps: true })
export class Stocks {
  @Prop({ required: true })
  symbol: string

  @Prop()
  company: string

  // common / etf
  @Prop({ enum: StocksType, default: StocksType.COMMON })
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

  @Prop({ enum: CustomStocksType })
  customType: string

  @Prop()
  logoid: string
}

const StocksSchema = SchemaFactory.createForClass(Stocks)
const StocksSchemaExcludeIndex = SchemaFactory.createForClass(Stocks)

StocksSchema.index({ symbol: 1 }, { unique: true })

export { StocksSchema, StocksSchemaExcludeIndex }
