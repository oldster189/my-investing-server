import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { Stocks, StocksDocument } from 'src/stocks/schemas/stocks.schema'
import { modelMapper } from 'src/utils/mapper.util'
import { AddStockWatchListRequest } from './requests/add-stock-watch-list.request'
import { CreateWatchListRequest, UpdateWatchListRequest } from './requests/create-watch-list.request'
import { WatchListResponse, WatchListListResponse } from './responses/watch-list.response'
import { WatchList, WatchListDocument } from './schemas/watch-list.schema'
import { FollowSuperInvestor, FollowSuperInvestorResponse, RealTimeQuote } from './responses/follow-super-investor'
import axios from 'axios'
import { StocksService } from 'src/stocks/stocks.service'

@Injectable()
export class WatchListsService {
  constructor(
    @InjectModel(WatchList.name) private readonly watchListModel: Model<WatchListDocument>,
    @InjectModel(Stocks.name) private readonly stocksModel: Model<StocksDocument>,
    private readonly stocksService: StocksService,
  ) {}

  async get(id: string): Promise<WatchListResponse> {
    const item = await this.watchListModel.findById(id).populate('stocks', '', this.stocksModel)
    return modelMapper(WatchListResponse, item)
  }

  async getAll(): Promise<WatchListResponse[]> {
    const list = await this.watchListModel.find().populate('stocks', '', this.stocksModel)
    return modelMapper(WatchListListResponse, { data: list }).data
  }

  async getAllFollowSuperInvestor(): Promise<FollowSuperInvestorResponse[]> {
    const stocks: FollowSuperInvestor[] = [
      { sa_ids: '1715', ticker: 'ASML', targetPrice: 724.75, company: 'ASML Holding N.V.' },
      {
        sa_ids: '1534',
        ticker: 'TSM',
        targetPrice: 100.92,
        company: 'Taiwan Semiconductor Manufacturing Company Limited',
      },
      { sa_ids: '575', ticker: 'MSFT', targetPrice: 340.54, company: 'Microsoft Corporation' },
      { sa_ids: '1422', ticker: 'MRK', targetPrice: 115.38, company: 'Merck & Co., Inc.   ' },
      { sa_ids: '14539', ticker: 'AVGO', targetPrice: 867.43, company: 'Broadcom Inc.' },
      { sa_ids: '2182', ticker: 'DHI', targetPrice: 121.69, company: 'D.R. Horton, Inc.' },
      { sa_ids: '1032', ticker: 'PEP', targetPrice: 185.14, company: 'PepsiCo, Inc.' },
      { sa_ids: '1212', ticker: 'CVS', targetPrice: 69.13, company: 'CVS Health Corporation' },
      { sa_ids: '903', ticker: 'MA', targetPrice: 393.3, company: 'Mastercard Incorporated' },
      { sa_ids: '9691', ticker: 'V', targetPrice: 237.48, company: 'Visa Inc.' },
      { sa_ids: '907', ticker: 'JPM', targetPrice: 145.44, company: 'JPMorgan Chase & Co.' },
      { sa_ids: '1150', ticker: 'NVDA', targetPrice: 423.02, company: 'NVIDIA Corporation' },
      { sa_ids: '1719', ticker: 'UNH', targetPrice: 480.64, company: 'UnitedHealth Group Incorporated' },
      { sa_ids: '562', ticker: 'AMZN', targetPrice: 130.36, company: 'Amazon.com, Inc.' },
      { sa_ids: '1135', ticker: 'JNJ', targetPrice: 165.34, company: 'Johnson & Johnson' },
      { sa_ids: '146', ticker: 'AAPL', targetPrice: 164.9, company: 'Apple Inc.' },
      { sa_ids: '544', ticker: 'GOOGL', targetPrice: 120.97, company: 'Alphabet Inc.' },
      { sa_ids: '1421', ticker: 'LLY', targetPrice: 468.98, company: 'Eli Lilly and Company' },
      { sa_ids: '92371', ticker: 'ABBV', targetPrice: 134.73, company: 'AbbVie Inc.' },
      { sa_ids: '3133', ticker: 'APD', targetPrice: 299.53, company: 'Air Products and Chemicals, Inc.' },
      { sa_ids: '2109', ticker: 'CI', targetPrice: 280.6, company: 'The Cigna Group' },
    ]
    return this.handleCheckPriceRealTime(stocks)
  }

  async handleCheckPriceRealTime(stocks: FollowSuperInvestor[]): Promise<FollowSuperInvestorResponse[]> {
    try {
      const ids = stocks.map((stock) => stock.sa_ids).join(',')
      const symbols = stocks.map((stock) => stock.ticker)
      const stockInfos = await this.stocksService.getBySymbols(symbols)
      const { data: response } = await axios.get<RealTimeQuote>(
        `https://finance-api.seekingalpha.com/real_time_quotes?sa_ids=${ids}`,
      )
      const { real_time_quotes } = response
      const newStocks = await Promise.all(
        real_time_quotes.map(async (quote) => {
          const stock = stocks.find((item) => item.sa_ids === String(quote.sa_id))
          const stockInfo = stockInfos.find((item) => item.symbol === quote.symbol)
          stock.info = stockInfo
          stock.currentPrice = quote.last
          stock.differencePercent = ((stock.targetPrice - quote.last) / stock.targetPrice) * 100
          const newStock: any = {
            ...stock,
          }
          return newStock
        }),
      )
      return newStocks.sort((a, b) => b.differencePercent - a.differencePercent)
    } catch (error) {
      throw error
    }
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
