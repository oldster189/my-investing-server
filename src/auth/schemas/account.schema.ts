import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type AccountDocument = HydratedDocument<Account>

@Schema({ timestamps: true })
export class Account {
  @Prop({ required: true, unique: true })
  email: string

  @Prop({ required: true })
  password: string

  @Prop({ required: true, unique: true })
  dbname: string

  @Prop()
  image: string

  @Prop()
  firstName: string

  @Prop()
  lastName: string

  @Prop()
  sex: string

  @Prop()
  phoneNumber: string
}

export const AccountSchema = SchemaFactory.createForClass(Account)
