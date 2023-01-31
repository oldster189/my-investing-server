import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type DividendDocument = HydratedDocument<Dividend>

@Schema({ timestamps: true })
export class Dividend {
  @Prop()
  dividendYield: number

  @Prop()
  annualPayout: number

  @Prop()
  payoutRatio: number

  @Prop()
  fifthYearGrowthRate: number

  @Prop()
  dividendGrowth: number

  @Prop()
  amount: number

  @Prop()
  exDivDate: number

  @Prop()
  payoutDate: number

  @Prop()
  divFrequency: number
}

export const DividendSchema = SchemaFactory.createForClass(Dividend)
