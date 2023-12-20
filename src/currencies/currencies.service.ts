import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import axios from 'axios'
import * as dayjs from 'dayjs'
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

      const url = `https://bank.kkpfg.com/Utility/GetExchangeRate?date=${dayjs().toISOString()}&lang=th&firstTime=false`
      const { data: response } = await axios.get<ExchangeRate>(url)
      const usdDetail = response.data[response.data.length - 1].detail.find((detail) => detail.currencyCode === 'USD')
      if (!usdDetail) throw new BadRequestException('Exchange rate not found')

      const { currencyCode, buyingRate } = usdDetail
      const newCurrency = await this.getByCode(currencyCode)
      newCurrency.rate = buyingRate
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
