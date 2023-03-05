import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { Stocks, StocksDocument } from 'src/stocks/schemas/stocks.schema'
import { StocksService } from 'src/stocks/stocks.service'
import { modelMapper } from 'src/utils/mapper.util'
import { AddStockPortfolioRequest } from './requests/add-stock-portfolio.request'
import { CreatePortfolioRequest, UpdatePortfolioRequest } from './requests/create-portfolio.request'
import { PortfolioListResponse, PortfolioResponse } from './responses/portfolio.response'
import { Portfolio, PortfolioDocument } from './schemas/portfolio.schema'

@Injectable()
export class PortfoliosService {
  constructor(
    @InjectModel(Portfolio.name) private readonly portfolioModel: Model<PortfolioDocument>,
    @InjectModel(Stocks.name) private readonly stocksModel: Model<StocksDocument>,
    private stocksService: StocksService,
  ) {}

  async get(id: string): Promise<PortfolioResponse> {
    const item = await this.portfolioModel.findById(id).populate('stocks', '', this.stocksModel)
    return modelMapper(PortfolioResponse, item)
  }

  async getAll(): Promise<PortfolioResponse[]> {
    const list = await this.portfolioModel.find().populate({
      path: 'stocks',
      model: this.stocksModel,
    })
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

  async addStock(addRequest: AddStockPortfolioRequest): Promise<PortfolioResponse> {
    const { _id, stocks } = addRequest
    const symbols = stocks.map((stock) => stock.symbol)
    const stockBySymbols = await this.stocksService.getBySymbols(symbols)
    const createStockIds = symbols.filter((symbol) => !stockBySymbols.some((stock) => stock.symbol === symbol))

    let newStocksIds = stockBySymbols.map((stock) => stock._id)
    if (createStockIds.length > 0) {
      const createStocks = stocks.filter((stock) => createStockIds.some((symbol) => symbol === stock.symbol))
      const newStocks = await this.stocksService.createList(createStocks)

      newStocksIds = [...newStocksIds, ...newStocks.map((stock) => stock._id)]
    }

    const portfolio = await this.portfolioModel.findById(_id)
    const { stocksIds } = portfolio
    newStocksIds = newStocksIds
      .filter((id) => !stocksIds.some((_id) => String(_id) === String(id)))
      .map((id) => String(id))
    if (newStocksIds.length === 0) throw new BadRequestException('Stock is exist in portfolio')
    await this.portfolioModel.updateOne({ _id: new Types.ObjectId(_id) }, { $push: { stocksIds: newStocksIds } })

    return this.get(_id)
  }

  async delete(id: string): Promise<PortfolioResponse> {
    const item = await this.get(id)
    await this.portfolioModel.deleteOne({ _id: new Types.ObjectId(id) })
    return item
  }

  async updateStock(updateRequest: UpdatePortfolioRequest): Promise<PortfolioResponse> {
    console.log(updateRequest)
    const { _id, stocks } = updateRequest
    console.log(_id, stocks)
    const newStocksIds = stocks.map((stock) => stock._id)
    await this.portfolioModel.updateOne({ _id: new Types.ObjectId(_id) }, { $set: { stocksIds: newStocksIds } })

    return this.get(_id)
  }
}
