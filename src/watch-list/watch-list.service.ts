import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { Stocks, StocksDocument } from 'src/stocks/schemas/stocks.schema'
import { modelMapper } from 'src/utils/mapper.util'
import { AddStockWatchListRequest } from './requests/add-stock-watch-list.request'
import { CreateWatchListRequest, UpdateWatchListRequest } from './requests/create-watch-list.request'
import { WatchListResponse, WatchListListResponse } from './responses/watch-list.response'
import { WatchList, WatchListDocument } from './schemas/watch-list.schema'

@Injectable()
export class WatchListService {
  constructor(
    @InjectModel(WatchList.name) private readonly watchListModel: Model<WatchListDocument>,
    @InjectModel(Stocks.name) private readonly stocksModel: Model<StocksDocument>,
  ) {}

  async get(id: string): Promise<WatchListResponse> {
    const item = await this.watchListModel.findById(id).populate('stocks', '', this.stocksModel)
    return modelMapper(WatchListResponse, item)
  }

  async getAll(): Promise<WatchListResponse[]> {
    const list = await this.watchListModel.find().populate('stocks', '', this.stocksModel)
    return modelMapper(WatchListListResponse, { data: list }).data
  }

  async create(createRequest: CreateWatchListRequest): Promise<WatchListResponse> {
    const newItem = await new this.watchListModel(createRequest).save()
    return this.get(String(newItem._id))
  }

  async update(updateRequest: UpdateWatchListRequest): Promise<WatchListResponse> {
    const { _id } = updateRequest
    await this.watchListModel.updateOne({ _id: new Types.ObjectId(_id) }, updateRequest)
    return this.get(_id)
  }

  async add(addRequest: AddStockWatchListRequest): Promise<WatchListResponse> {
    const { _id, stock } = addRequest
    await this.watchListModel.updateOne({ _id: new Types.ObjectId(_id) }, { $push: { stocksIds: stock._id } })

    return this.get(_id)
  }

  async delete(id: string): Promise<WatchListResponse> {
    const item = await this.get(id)
    await this.watchListModel.deleteOne({ _id: new Types.ObjectId(id) })
    return item
  }
}
