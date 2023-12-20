import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import axios from 'axios'
import { Model, Types } from 'mongoose'
import { modelMapper } from 'src/utils/mapper.util'
import { CreateCurrencyRequest, UpdateCurrencyRequest } from './requests/create-currency.request'
import { CurrencyResponse, CurrencyListResponse } from './responses/currency.response'
import { Currency, CurrencyDocument } from './schemas/currency.schema'
import { ExchangeRate } from './types/exchangeRate.type'

@Injectable()
export class CurrenciesService {
  constructor(@InjectModel(Currency.name) private readonly currencyModel: Model<CurrencyDocument>) {}

  async getExchangeRate(): Promise<any> {
    try {
      const options = {
        method: 'GET',
        url: 'https://exchange-rate-api1.p.rapidapi.com/latest',
        params: { base: 'USD' },
        headers: {
          'X-RapidAPI-Key': '9c96ae2b60msh9840e548bdd1f93p111c6ajsn4bc476b0f16e',
          'X-RapidAPI-Host': 'exchange-rate-api1.p.rapidapi.com',
        },
      }

      const response = await axios.request<ExchangeRate>(options)
      const newCurrency = await this.getByCode('THB')
      newCurrency.rate = response.data.rates['THB']
      return newCurrency
    } catch (error) {
      throw error
    }
  }

  async getByCode(code: string): Promise<CurrencyResponse> {
    const item = await this.currencyModel.findOne({ abbreviation: code })
    return modelMapper(CurrencyResponse, item)
  }

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
