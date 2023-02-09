import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import axios from 'axios'
import { Model, Types } from 'mongoose'
import { modelMapper } from 'src/utils/mapper.util'
import { CreateStocksRequest, UpdateStocksRequest } from './requests/create-stocks.request'
import { StockInfo } from './responses/stocks-info.response'
import { StocksListResponse, StocksResponse } from './responses/stocks.response'
import { SuggestionStock } from './responses/suggestion-stocks.response'
import { Stocks, StocksDocument } from './schemas/stocks.schema'

@Injectable()
export class StocksService {
  constructor(@InjectModel(Stocks.name) private readonly stocksModel: Model<StocksDocument>) {}

  async isExist(symbol: string): Promise<boolean> {
    const item = await this.stocksModel.findOne({ symbol })
    return !!item
  }

  async get(symbol: string): Promise<StocksResponse> {
    const item = await this.stocksModel.findOne({ symbol })
    return modelMapper(StocksResponse, item)
  }

  async getAll(): Promise<StocksResponse[]> {
    const list = await this.stocksModel.find()
    return modelMapper(StocksListResponse, { data: list }).data
  }

  async create(createRequest: CreateStocksRequest): Promise<StocksResponse> {
    const newItem = await new this.stocksModel(createRequest).save()
    return this.get(String(newItem._id))
  }

  async update(updateRequest: UpdateStocksRequest): Promise<StocksResponse> {
    const { _id } = updateRequest
    await this.stocksModel.updateOne({ _id: new Types.ObjectId(_id) }, updateRequest)
    return this.get(_id)
  }

  async delete(id: string): Promise<StocksResponse> {
    const item = await this.get(id)
    await this.stocksModel.deleteOne({ _id: new Types.ObjectId(id) })
    return item
  }

  async getStockInfo(symbol: string): Promise<StockInfo> {
    try {
      const { data } = await axios.get(`https://finviz.com/quote.ashx?t=${symbol}&ty=c&p=d&b=1`)
      const htmlTable = '<table width="100%" cellpadding="3" cellspacing="0" bgcolor="#ffffff" class="fullview-title">'
      const contents = data.split(htmlTable)[1]
      const htmlTableCloseTag = '</table>'
      const contentStockInfo = contents.split(htmlTableCloseTag)[0]
      const trTags = contentStockInfo.split('<tr><td')
      let exchange = trTags[1].split('[')[1].split(']')[0]
      if (exchange === 'NASD') {
        exchange = 'NASDAQ'
      }

      const companyTags = trTags[2].split('rel="nofollow"><b>')
      const company = companyTags[1].split('</b>')[0]

      const infoTags = trTags[trTags.length - 1]
      const linkTags = infoTags.split('class="tab-link">')
      const itemTags = linkTags.slice(1, linkTags.length)
      const sector = itemTags[0].split('</a>')[0]
      const industry = itemTags[1].split('</a>')[0]
      const country = itemTags[2].split('</a>')[0]
      return { symbol: symbol.toUpperCase(), company, sector, industry, country, exchange }
    } catch (error) {
      return { symbol, company: '', sector: '', industry: '', country: '', exchange: '' }
    }
  }

  async suggestionStockList(symbol: string): Promise<SuggestionStock> {
    try {
      const { data: stockList } = await axios.get(`https:finviz.com/api/suggestions.ashx?input=${symbol}`)
      const newData = stockList.map((stock) => ({
        symbol: stock.ticker,
        company: stock.company,
        exchange: stock.exchange,
      }))
      return newData
    } catch (error) {
      throw error
    }
  }
}
