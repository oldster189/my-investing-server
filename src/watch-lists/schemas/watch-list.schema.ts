import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose'

export type WatchListDocument = HydratedDocument<WatchList>

@Schema({ timestamps: true })
export class WatchList {
  @Prop({ required: true, unique: true })
  name: string

  @Prop({
    required: true,
    type: [MongooseSchema.Types.ObjectId],
    ref: 'Stocks',
  })
  stocksIds: Types.ObjectId[]
}

const WatchListSchema = SchemaFactory.createForClass(WatchList)

WatchListSchema.virtual('stocks', {
  ref: 'Stocks',
  localField: 'stocksIds',
  foreignField: '_id',
})

export { WatchListSchema }
