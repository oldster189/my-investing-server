import { TransactionStatus } from 'src/shared/enums/transaction-status.enum'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { modelMapper } from 'src/utils/mapper.util'
import { CreateTransactionRequest, UpdateTransactionRequest } from './requests/create-transaction.request'
import { TransactionListResponse, TransactionResponse } from './responses/transaction.response'
import { Transaction, TransactionDocument } from './schemas/transaction.schema'
import { ExchangesService } from 'src/exchanges/exchanges.service'
import { StocksService } from 'src/stocks/stocks.service'
import { TransactionType } from 'src/shared/enums/transaction-type.enum'
import * as dayjs from 'dayjs'
import { UpdateStocksRequest } from 'src/stocks/requests/create-stocks.request'
import { ExchangeQuery } from 'src/exchanges/requests/query-exchange.request'
import * as IVV from './ivv.json'
import * as QQQM from './qqqm.json'
import axios from 'axios'

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name) private readonly transactionModel: Model<TransactionDocument>,
    private readonly exchangesService: ExchangesService,
    private readonly stocksService: StocksService,
  ) {}

  async test(symbol: string) {
    const { data: lastPrice2 }: any = await axios.get(
      `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=96GXQ0N4DD6ZO1EQ`,
    )
    const keyLastPrice = lastPrice2['Meta Data']['3. Last Refreshed']
    const lastPriceObj = lastPrice2['Time Series (5min)'][keyLastPrice]['4. close']
    const lastPrice = lastPriceObj ? Number(lastPriceObj) : 0
    const portfolioId = new Types.ObjectId('63e3e3a274f7f13c286cea3e')
    const list = await this.transactionModel.find({
      portfolioId,
      'stocks.symbol': symbol,
    })
    const totalShare = list.reduce((acc, item) => {
      return acc + item.stocks.share
    }, 0.0)
    const totalBalance = totalShare * lastPrice

    const exchanges = await this.exchangesService.getAllByPortfolioId(String(portfolioId), { type: 'all' })

    // find min date by as_of_date
    const firstDateInvestment = exchanges.reduce((acc, item) => {
      return acc < item.dateOfOrder ? acc : item.dateOfOrder
    }, new Date())

    const totalCost = exchanges.reduce((acc, item) => {
      return acc + item.to.amount
    }, 0.0)

    const totalChangeUSD = totalBalance - totalCost
    const totalChangePercent = (totalChangeUSD / totalCost) * 100
    const totalMonth = dayjs().diff(firstDateInvestment, 'month')
    const totalYear = Math.ceil(totalMonth / 12)

    const compoundInterest = Math.pow(1 + totalChangePercent / 100, 1 / totalYear) - 1
    const compoundInterestPercent = compoundInterest * 100

    return {
      totalBalance: Number(totalBalance.toFixed(2)),
      totalCost: Number(totalCost.toFixed(2)),
      totalChangeUSD: Number(totalChangeUSD.toFixed(2)),
      totalChangePercent: Number(totalChangePercent.toFixed(2)),
      compoundInterestPercent: Number(compoundInterestPercent.toFixed(2)),
      lastPrice,
    }
  }

  async get(id: string): Promise<TransactionResponse> {
    const item = await this.transactionModel.findById(id)
    return modelMapper(TransactionResponse, item)
  }

  async getAll(): Promise<TransactionResponse[]> {
    const list = await this.transactionModel.find().sort({ dateOfOrder: -1 })
    return modelMapper(TransactionListResponse, { data: list }).data
  }

  async getAllBySymbol(symbol: string): Promise<TransactionResponse[]> {
    const list = await this.transactionModel.find({ symbol })
    return modelMapper(TransactionListResponse, { data: list }).data
  }

  async getAllByPortfolioId(portfolioId: string): Promise<TransactionResponse[]> {
    const list = await this.transactionModel.find({ portfolioId })
    return modelMapper(TransactionListResponse, { data: list }).data
  }

  async create(createRequest: CreateTransactionRequest): Promise<TransactionResponse> {
    const newItem = await new this.transactionModel(createRequest).save()
    return this.get(String(newItem._id))
  }

  getCurrentStock(date: string, symbol: string) {
    const list = symbol === 'IVV' ? IVV.data : QQQM.data
    const currentStock = list.find((item) => {
      return item.attributes.as_of_date === date
    })

    if (!currentStock) {
      const newDate = dayjs(date).add(1, 'day').format('YYYY-MM-DD')
      return this.getCurrentStock(newDate, symbol)
    }

    return currentStock
  }

  async getLastItemByPortfolioId(portfolioId: string, symbol: string): Promise<TransactionResponse> {
    const data = await this.transactionModel.findOne({ portfolioId, 'stocks.symbol': symbol }).sort({ dateOfOrder: -1 })
    return modelMapper(TransactionResponse, data)
  }

  // สำหรับดึง json  มาสร้าง transaction
  // https://seekingalpha.com/api/v3/historical_prices?filter[ticker][slug]=qqqm&&filter[as_of_date][gte]=Fri Nov 1 2022&filter[as_of_date][lte]=Tue Jun 25 2024&sort=as_of_date
  async createByZant(portfolioId: string, symbol: string): Promise<any> {
    try {
      const stock = await this.stocksService.get(symbol)
      const lastData = await this.getLastItemByPortfolioId(portfolioId, symbol)
      let query: ExchangeQuery = { type: 'all' }
      if (lastData) {
        query = {
          type: 'customs',
          startDate: dayjs(lastData.dateOfOrder).add(1, 'day').toISOString(),
          endDate: dayjs().toISOString(),
        }
      }

      const exchanges = await this.exchangesService.getAllByPortfolioId(portfolioId, query)
      for (let index = 0; index < exchanges.length; index++) {
        const exchange = exchanges[index]

        const date = dayjs(exchange.dateOfOrder).format('YYYY-MM-DD')
        const currentStock = this.getCurrentStock(date, symbol)

        const closePrice = currentStock.attributes.close
        const amountUSD = exchange.to.amount
        const buyStock: UpdateStocksRequest = {
          ...stock,
          price: closePrice,
          share: amountUSD / closePrice,
        }
        const body: CreateTransactionRequest = {
          portfolioId,
          type: TransactionType.BUY,
          stocks: buyStock,
          payments: [exchange.from, exchange.to],
          commission: 0,
          tax: 0,
          totalAmount: exchange.from.amount,
          status: TransactionStatus.SUCCESS,
          dateOfOrder: dayjs(currentStock.attributes.as_of_date).startOf('day').toDate(),
        }

        await new this.transactionModel(body).save()
      }

      return this.getAllBySymbol(symbol)
    } catch (error) {
      console.log(error)
    }
  }

  async update(updateRequest: UpdateTransactionRequest): Promise<TransactionResponse> {
    const { _id } = updateRequest
    await this.transactionModel.updateOne({ _id: new Types.ObjectId(_id) }, updateRequest)
    return this.get(_id)
  }

  async delete(id: string): Promise<TransactionResponse> {
    const item = await this.get(id)
    await this.transactionModel.deleteOne({ _id: new Types.ObjectId(id) })
    return item
  }
}
