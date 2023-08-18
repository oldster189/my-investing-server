import { sendLineNotify } from './../utils/send-line.util'
import { Injectable } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import axios from 'axios'

interface RealTimeQuote {
  real_time_quotes: Quote[]
}

interface Quote {
  sa_id: number
  sa_slug: string
  symbol: string
  high: number
  low: number
  open: number
  close: number
  prev_close: number
  last: number
  volume: number
  last_time: Date
  market_cap: number
  info: string
  src: string
  updated_at: Date
}

interface FollowSuperInvestor {
  sa_ids: string
  ticker: string
  price: number
}

const stocks: FollowSuperInvestor[] = [
  { sa_ids: '1715', ticker: 'ASML', price: 724.75 },
  { sa_ids: '1534', ticker: 'TSM', price: 100.92 },
  { sa_ids: '575', ticker: 'MSFT', price: 340.54 },
  { sa_ids: '1422', ticker: 'MRK', price: 115.38 },
  { sa_ids: '14539', ticker: 'AVGO', price: 867.43 },
  { sa_ids: '2182', ticker: 'DHI', price: 121.69 },
  { sa_ids: '1032', ticker: 'PEP', price: 185.14 },
  { sa_ids: '1212', ticker: 'CVS', price: 69.13 },
  { sa_ids: '903', ticker: 'MA', price: 393.3 },
  { sa_ids: '9691', ticker: 'V', price: 237.48 },
  { sa_ids: '907', ticker: 'JPM', price: 145.44 },
  { sa_ids: '1150', ticker: 'NVDA', price: 423.02 },
  { sa_ids: '1719', ticker: 'UNH', price: 480.64 },
  { sa_ids: '562', ticker: 'AMZN', price: 130.36 },
  { sa_ids: '1135', ticker: 'JNJ', price: 165.34 },
  { sa_ids: '146', ticker: 'AAPL', price: 164.9 },
  { sa_ids: '544', ticker: 'GOOG', price: 120.97 },
  { sa_ids: '1421', ticker: 'LLY', price: 468.98 },
]
@Injectable()
export class TasksService {
  @Cron('30,35,40,45,50,55 20 * * 1-5')
  async checkCurrentPriceStockFromSuperInvestor1() {
    try {
      await this.handleCheckPriceRealTime()
    } catch (error) {}
  }

  @Cron('0,5,10,15,20,25,30,35,40,45,50,55 21-23 * * 1-5')
  async checkCurrentPriceStockFromSuperInvestor2() {
    try {
      await this.handleCheckPriceRealTime()
    } catch (error) {}
  }

  @Cron('0,5,10,15,20,25,30,35,40,45,50,55 0-4 * * 2-6')
  async checkCurrentPriceStockFromSuperInvestor3() {
    try {
      await this.handleCheckPriceRealTime()
    } catch (error) {}
  }

  async handleCheckPriceRealTime() {
    for (let index = 0; index < stocks.length; index++) {
      const stock = stocks[index]
      const { data: response } = await axios.get<RealTimeQuote>(
        `https://finance-api.seekingalpha.com/real_time_quotes?sa_ids=${stock.sa_ids}`,
      )
      const { real_time_quotes } = response
      const quote = real_time_quotes[0]
      if (quote.last <= stock.price) {
        const difference = ((stock.price - quote.last) / stock.price) * 100
        const message = `${stock.ticker}\nTarget: ${stock.price}\nCurrent: ${quote.last}\nDifference: ${difference}%`
        sendLineNotify(message, 'clzhHdxVZ6FULIQJ42HGcToNjUIjRMbDmPsyEKdBpKR')
      }
    }
  }
}
