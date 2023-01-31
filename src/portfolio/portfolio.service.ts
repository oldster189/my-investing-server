import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { Stocks, StocksDocument } from 'src/stocks/schemas/stocks.schema'
import { modelMapper } from 'src/utils/mapper.util'
import { AddStockPortfolioRequest } from './requests/add-stock-portfolio.request'
import { CreatePortfolioRequest, UpdatePortfolioRequest } from './requests/create-portfolio.request'
import { PortfolioListResponse, PortfolioResponse } from './responses/portfolio.response'
import { Portfolio, PortfolioDocument } from './schemas/portfolio.schema'

@Injectable()
export class PortfolioService {
  constructor(
    @InjectModel(Portfolio.name) private readonly portfolioModel: Model<PortfolioDocument>,
    @InjectModel(Stocks.name) private readonly stocksModel: Model<StocksDocument>,
  ) {}

  async get(id: string): Promise<PortfolioResponse> {
    const item = await this.portfolioModel.findById(id).populate('stocks', '', this.stocksModel)
    return modelMapper(PortfolioResponse, item)
  }

  async getAll(): Promise<PortfolioResponse[]> {
    const list = await this.portfolioModel.find().populate('stocks', '', this.stocksModel)
    return modelMapper(PortfolioListResponse, { data: list }).data
  }

  async create(createRequest: CreatePortfolioRequest): Promise<PortfolioResponse> {
    const newItem = await new this.portfolioModel(createRequest).save()
    return this.get(String(newItem._id))
  }

  async update(updateRequest: UpdatePortfolioRequest): Promise<PortfolioResponse> {
    const { _id, name } = updateRequest
    await this.portfolioModel.updateOne({ _id: new Types.ObjectId(_id) }, { name })
    return this.get(_id)
  }

  async add(addRequest: AddStockPortfolioRequest): Promise<PortfolioResponse> {
    const { _id, stock } = addRequest
    await this.portfolioModel.updateOne({ _id: new Types.ObjectId(_id) }, { $push: { stocksIds: stock._id } })

    return this.get(_id)
  }

  async delete(id: string): Promise<PortfolioResponse> {
    const item = await this.get(id)
    await this.portfolioModel.deleteOne({ _id: new Types.ObjectId(id) })
    return item
  }
}
