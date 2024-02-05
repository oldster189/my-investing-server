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
import * as dayjs from 'dayjs'

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
      { sa_ids: '1715', ticker: 'ASML', targetPrice: 588.66, company: 'ASML Holding N.V.' },
      {
        sa_ids: '1534',
        ticker: 'TSM',
        targetPrice: 86.9,
        company: 'Taiwan Semiconductor Manufacturing Company Limited',
      },
      { sa_ids: '575', ticker: 'MSFT', targetPrice: 376.04, company: 'Microsoft Corporation' },
      { sa_ids: '1422', ticker: 'MRK', targetPrice: 102.95, company: 'Merck & Co., Inc.   ' },
      { sa_ids: '14539', ticker: 'AVGO', targetPrice: 830.58, company: 'Broadcom Inc.' },
      { sa_ids: '2182', ticker: 'DHI', targetPrice: 151.98, company: 'D.R. Horton, Inc.' },
      { sa_ids: '1032', ticker: 'PEP', targetPrice: 169.44, company: 'PepsiCo, Inc.' },
      { sa_ids: '1212', ticker: 'CVS', targetPrice: 69.82, company: 'CVS Health Corporation' },
      { sa_ids: '903', ticker: 'MA', targetPrice: 426.51, company: 'Mastercard Incorporated' },
      { sa_ids: '9691', ticker: 'V', targetPrice: 230.01, company: 'Visa Inc.' },
      { sa_ids: '907', ticker: 'JPM', targetPrice: 170.1, company: 'JPMorgan Chase & Co.' },
      { sa_ids: '1150', ticker: 'NVDA', targetPrice: 434.99, company: 'NVIDIA Corporation' },
      { sa_ids: '1719', ticker: 'UNH', targetPrice: 526.47, company: 'UnitedHealth Group Incorporated' },
      { sa_ids: '562', ticker: 'AMZN', targetPrice: 127.12, company: 'Amazon.com, Inc.' },
      { sa_ids: '1135', ticker: 'JNJ', targetPrice: 156.74, company: 'Johnson & Johnson' },
      { sa_ids: '146', ticker: 'AAPL', targetPrice: 192.53, company: 'Apple Inc.' },
      { sa_ids: '148893', ticker: 'GOOGL', targetPrice: 140.93, company: 'Alphabet Inc.' },
      { sa_ids: '1421', ticker: 'LLY', targetPrice: 537.13, company: 'Eli Lilly and Company' },
      { sa_ids: '92371', ticker: 'ABBV', targetPrice: 149.06, company: 'AbbVie Inc.' },
      { sa_ids: '3133', ticker: 'APD', targetPrice: 299.53, company: 'Air Products and Chemicals, Inc.' },
      { sa_ids: '2109', ticker: 'CI', targetPrice: 286.07, company: 'The Cigna Group' },
      { sa_ids: '1216', ticker: 'PFE', targetPrice: 33.17, company: 'Pfizer Inc.' },
      { sa_ids: '54', ticker: 'SPY', targetPrice: 427.48, company: 'SPDR® S&P 500 ETF Trust' },
      { sa_ids: '2853', ticker: 'DE', targetPrice: 377.41, company: 'Deere & Company' },
      { sa_ids: '16123', ticker: 'TSLA', targetPrice: 207.46, company: 'Tesla, Inc.' },
      { sa_ids: '2150', ticker: 'BLK', targetPrice: 646.49, company: 'BlackRock, Inc.' },
      { sa_ids: '1835', ticker: 'LMT', targetPrice: 408.96, company: 'Lockheed Martin Corporation' },
      { sa_ids: '1433', ticker: 'LOW', targetPrice: 207.85, company: "Lowe's Companies, Inc." },
      { sa_ids: '891', ticker: 'PG', targetPrice: 145.87, company: 'The Procter & Gamble Company' },
      { sa_ids: '1051', ticker: 'TXN', targetPrice: 159.04, company: 'Texas Instruments Incorporated' },
      { sa_ids: '1278', ticker: 'NVO', targetPrice: 90.94, company: ' Novo Nordisk A/S' },
    ]
    return this.handleCheckPriceRealTime(stocks)
  }
  //https://seekingalpha.com/api/v3/symbol_data?fields[]=divDistribution&fields[]=dividends&slugs=AAPL

  async handleCheckPriceRealTime(stocks: FollowSuperInvestor[]): Promise<FollowSuperInvestorResponse[]> {
    try {
      const ids = stocks
        .map((stock) => stock.sa_ids)
        .sort((a, b) => Number(a) - Number(b))
        .join(',')
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
          stock.futurePrice = quote.ext_price || 0
          stock.differencePercent = ((stock.targetPrice - quote.last) / stock.targetPrice) * 100
          stock.futureDifferencePercent = quote.ext_price
            ? ((stock.targetPrice - quote.ext_price) / stock.targetPrice) * 100
            : 0
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

  async fetchCsvAndConvertToJson() {
    try {
      const url = `https://www.schwabassetmanagement.com/sites/g/files/eyrktu361/files/product_files/SCHD/SCHD_FundHoldings_${dayjs().format(
        'YYYY-MM-DD',
      )}.CSV`
      console.log(url)
      // const response = await axios.get(url)
      // const csvData = response.data
      // const stocks: any[] = await new Promise((resolve, reject) => {
      //   Papa.parse(csvData, {
      //     header: true, // Use the first row as header names
      //     dynamicTyping: true, // Convert strings to numbers or booleans if possible
      //     skipEmptyLines: true, // Skips empty lines in the CSV file
      //     complete: async function (results) {
      //       resolve(results.data.slice(0, 20))
      //     },
      //     error: function (err) {
      //       reject(err)
      //     },
      //   })
      // })

      // const slugs = stocks.map((item: any) => item.Symbol).join(',')
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://seekingalpha.com/api/v3/symbol_data?fields[]=div_yield_fwd&fields[]=div_yield_4y&slugs=AMGN,ABBV,CVX,PFE,PEP,MRK,CSCO,TXN,VZ,AVGO,KO,UPS,HD,ADP,BLK,LMT,MO,BX,EOG,ITW',
        headers: {
          Cookie:
            'ever_pro=1; gk_user_access=; gk_user_access_sign=; machine_cookie=2741878955146; machine_cookie_ts=1690212269',
        },
      }

      const { data: responseDiv } = await axios.request(config)

      return responseDiv
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}
