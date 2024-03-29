import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import * as dayjs from 'dayjs'
import { Model, Types } from 'mongoose'
import { TransactionStatus } from 'src/shared/enums/transaction-status.enum'
import { modelMapper } from 'src/utils/mapper.util'
import { CreateExchangeRequest, UpdateExchangeRequest } from './requests/create-exchange.request'
import { ExchangeListResponse, ExchangeResponse } from './responses/exchange.response'
import { Exchange, ExchangeDocument } from './schemas/exchange.schema'
import { ExchangeQuery } from './requests/query-exchange.request'

@Injectable()
export class ExchangesService {
  constructor(@InjectModel(Exchange.name) private readonly exchangeModel: Model<ExchangeDocument>) {}

  async get(id: string): Promise<ExchangeResponse> {
    const item = await this.exchangeModel.findById(id)
    return modelMapper(ExchangeResponse, item)
  }

  async getAll(): Promise<ExchangeResponse[]> {
    const list = await this.exchangeModel.find().sort({ dateOfOrder: -1, createdAt: -1 })
    return modelMapper(ExchangeListResponse, { data: list }).data
  }

  async getAllByPortfolioId(portfolioId: string, query: ExchangeQuery): Promise<ExchangeResponse[]> {
    const { type, startDate, endDate } = query
    let filter = {}
    if (type === 'customs') {
      filter = {
        dateOfOrder: {
          $gte: dayjs(startDate).startOf('date').toISOString(),
          $lte: dayjs(endDate).endOf('date').toISOString(),
        },
      }
    }
    const list = await this.exchangeModel
      .find({
        portfolioId,
        ...(type === 'customs' && filter),
      })
      .sort({ dateOfOrder: -1, createdAt: -1 })
    return modelMapper(ExchangeListResponse, { data: list }).data
  }

  async create(createRequest: CreateExchangeRequest): Promise<ExchangeResponse> {
    const { orderId, dateOfOrder } = createRequest
    let newCreateRequest = createRequest
    if (!orderId) {
      newCreateRequest = { ...newCreateRequest, orderId: String(new Date().getTime()) }
    }
    if (!dateOfOrder) {
      newCreateRequest = { ...newCreateRequest, dateOfOrder: dayjs().toDate() }
    }
    newCreateRequest.status = TransactionStatus.SUCCESS

    const newItem = await new this.exchangeModel(newCreateRequest).save()
    return this.get(String(newItem._id))
  }

  async update(updateRequest: UpdateExchangeRequest): Promise<ExchangeResponse> {
    const { _id } = updateRequest
    await this.exchangeModel.updateOne({ _id: new Types.ObjectId(_id) }, updateRequest)
    return this.get(_id)
  }

  async delete(id: string): Promise<ExchangeResponse> {
    const item = await this.get(id)
    await this.exchangeModel.deleteOne({ _id: new Types.ObjectId(id) })
    return item
  }

  // async deleteAll(): Promise<void> {
  //   await this.exchangeModel.deleteMany()
  // }
}
