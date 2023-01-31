import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { modelMapper } from 'src/utils/mapper.util'
import { CreateCurrencyRequest, UpdateCurrencyRequest } from './requests/create-currency.request'
import { CurrencyResponse, CurrencyListResponse } from './responses/currency.response'
import { Currency, CurrencyDocument } from './schemas/currency.schema'

@Injectable()
export class CurrencyService {
  constructor(@InjectModel(Currency.name) private readonly currencyModel: Model<CurrencyDocument>) {}

  async get(id: string): Promise<CurrencyResponse> {
    const item = await this.currencyModel.findById(id)
    return modelMapper(CurrencyResponse, item)
  }

  async getAll(): Promise<CurrencyResponse[]> {
    const list = await this.currencyModel.find()
    return modelMapper(CurrencyListResponse, { data: list }).data
  }

  async create(createRequest: CreateCurrencyRequest): Promise<CurrencyResponse> {
    const newItem = await new this.currencyModel(createRequest).save()
    return this.get(String(newItem._id))
  }

  async update(updateRequest: UpdateCurrencyRequest): Promise<CurrencyResponse> {
    const { _id } = updateRequest
    await this.currencyModel.updateOne({ _id: new Types.ObjectId(_id) }, updateRequest)
    return this.get(_id)
  }

  async delete(id: string): Promise<CurrencyResponse> {
    const item = await this.get(id)
    await this.currencyModel.deleteOne({ _id: new Types.ObjectId(id) })
    return item
  }
}
