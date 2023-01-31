import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type CurrencyDocument = HydratedDocument<Currency>

@Schema({ timestamps: true })
export class Currency {
  @Prop()
  name: string

  @Prop()
  nameEn: string

  @Prop()
  symbol: string

  @Prop()
  rate: string

  @Prop()
  abbreviation: string

  @Prop()
  amount: number
}

export const CurrencySchema = SchemaFactory.createForClass(Currency)
