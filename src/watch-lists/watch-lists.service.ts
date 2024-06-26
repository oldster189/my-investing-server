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
import * as ANLYTIC_STOCKS from './db.json'

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

  async getAnalyticStocks(): Promise<any> {
    const ThreeYear = '79135'
    const FifthYear = '79137'

    const anlyticStockObj = ANLYTIC_STOCKS.data
      .filter((item) => {
        return (
          (item.relationships.metric_type.data.id === ThreeYear && item.attributes.value >= 45) ||
          (item.relationships.metric_type.data.id === FifthYear && item.attributes.value >= 95)
        )
      })
      .map((item) => {
        const stock = ANLYTIC_STOCKS.included.find((stock) => stock.id === item.relationships.ticker.data.id)
        return {
          id: item.relationships.metric_type.data.id,
          value: item.attributes.value,
          ticker: stock.attributes.name,
        }
      })
      .reduce((acc, item) => {
        if (!acc[item.ticker]) {
          acc[item.ticker] = {}
        }
        if (item.id === ThreeYear) {
          acc[item.ticker] = { ...acc[item.ticker], '3Y': item.value.toFixed(2) }
        } else {
          acc[item.ticker] = { ...acc[item.ticker], '5Y': item.value.toFixed(2) }
        }
        return acc
      }, {})

    const symbols = Object.keys(anlyticStockObj)
    const stockInfos = await this.stocksService.getBySymbols(symbols)

    return Object.entries(anlyticStockObj)
      .map(([ticker, value]) => {
        const info = stockInfos.find((item) => item.symbol === ticker)
        return { ticker, info, ...(value as object) }
      })
      .sort((a, b) => {
        if (Object.keys(a).length > Object.keys(b).length) {
          return -1
        }
        if (Object.keys(a).length < Object.keys(b).length) {
          return 1
        }
        if (Number(a['5Y']) > Number(b['5Y'])) {
          return -1
        }
        if (Number(a['5Y']) < Number(b['5Y'])) {
          return 1
        }
        if (Number(a['3Y']) > Number(b['3Y'])) {
          return -1
        }
        if (Number(a['3Y']) < Number(b['3Y'])) {
          return 1
        }
        return 0
      })
  }

  async getAllFollowSuperInvestor(): Promise<FollowSuperInvestorResponse[]> {
    const stocks: FollowSuperInvestor[] = [
      { sa_ids: '1715', ticker: 'ASML', targetPrice: 970.47, company: 'ASML Holding N.V.' },
      {
        sa_ids: '1534',
        ticker: 'TSM',
        targetPrice: 138.49,
        company: 'Taiwan Semiconductor Manufacturing Company Limited',
      },
      { sa_ids: '575', ticker: 'MSFT', targetPrice: 420.82, company: 'Microsoft Corporation' },
      { sa_ids: '1422', ticker: 'MRK', targetPrice: 131.92, company: 'Merck & Co., Inc.   ' },
      { sa_ids: '14539', ticker: 'AVGO', targetPrice: 1325.41, company: 'Broadcom Inc.' },
      { sa_ids: '2182', ticker: 'DHI', targetPrice: 164.55, company: 'D.R. Horton, Inc.' },
      { sa_ids: '1032', ticker: 'PEP', targetPrice: 174.99, company: 'PepsiCo, Inc.' },
      { sa_ids: '1212', ticker: 'CVS', targetPrice: 79.76, company: 'CVS Health Corporation' },
      { sa_ids: '903', ticker: 'MA', targetPrice: 481.57, company: 'Mastercard Incorporated' },
      { sa_ids: '9691', ticker: 'V', targetPrice: 279.23, company: 'Visa Inc.' },
      { sa_ids: '907', ticker: 'JPM', targetPrice: 200.31, company: 'JPMorgan Chase & Co.' },
      { sa_ids: '1150', ticker: 'NVDA', targetPrice: 90.36, company: 'NVIDIA Corporation' },
      { sa_ids: '1719', ticker: 'UNH', targetPrice: 496.95, company: 'UnitedHealth Group Incorporated' },
      { sa_ids: '562', ticker: 'AMZN', targetPrice: 180.38, company: 'Amazon.com, Inc.' },
      { sa_ids: '1135', ticker: 'JNJ', targetPrice: 158.65, company: 'Johnson & Johnson' },
      { sa_ids: '146', ticker: 'AAPL', targetPrice: 172.99, company: 'Apple Inc.' },
      { sa_ids: '148893', ticker: 'GOOGL', targetPrice: 151.86, company: 'Alphabet Inc.' },
      { sa_ids: '1421', ticker: 'LLY', targetPrice: 777.96, company: 'Eli Lilly and Company' },
      { sa_ids: '92371', ticker: 'ABBV', targetPrice: 182.13, company: 'AbbVie Inc.' },
      { sa_ids: '3133', ticker: 'APD', targetPrice: 242.27, company: 'Air Products and Chemicals, Inc.' },
      { sa_ids: '2109', ticker: 'CI', targetPrice: 363.31, company: 'The Cigna Group' },
      { sa_ids: '1216', ticker: 'PFE', targetPrice: 27.75, company: 'Pfizer Inc.' },
      { sa_ids: '54', ticker: 'SPY', targetPrice: 523.07, company: 'SPDR® S&P 500 ETF Trust' },
      { sa_ids: '2853', ticker: 'DE', targetPrice: 410.74, company: 'Deere & Company' },
      { sa_ids: '16123', ticker: 'TSLA', targetPrice: 207.46, company: 'Tesla, Inc.' },
      { sa_ids: '1433', ticker: 'LOW', targetPrice: 254.73, company: "Lowe's Companies, Inc." },
      { sa_ids: '1278', ticker: 'NVO', targetPrice: 128.4, company: ' Novo Nordisk A/S' },
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
