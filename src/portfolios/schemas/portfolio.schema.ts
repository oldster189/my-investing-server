import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose'

export type PortfolioDocument = HydratedDocument<Portfolio>

@Schema({ timestamps: true, toJSON: { virtuals: true } })
export class Portfolio {
  @Prop({ required: true })
  dbname: string

  @Prop({ required: true, unique: true })
  name: string

  @Prop({
    type: [MongooseSchema.Types.ObjectId],
    ref: 'Stocks',
  })
  stocksIds: Types.ObjectId[]

  @Prop()
  totalInvested: number
}

const PortfolioSchema = SchemaFactory.createForClass(Portfolio)

PortfolioSchema.virtual('stocks', {
  ref: 'Stocks',
  localField: 'stocksIds',
  foreignField: '_id',
})

export { PortfolioSchema }
