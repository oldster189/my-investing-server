import { sendLineNotify } from './../utils/send-line.util'
import { Injectable } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import axios from 'axios'
import dayjs from 'dayjs'

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
  company?: string
  price: number
}

const stocks: FollowSuperInvestor[] = [
  { sa_ids: '1715', ticker: 'ASML', price: 724.75, company: 'ASML Holding N.V.' },
  { sa_ids: '1534', ticker: 'TSM', price: 100.92, company: 'Taiwan Semiconductor Manufacturing Company Limited' },
  { sa_ids: '575', ticker: 'MSFT', price: 340.54, company: 'Microsoft Corporation' },
  { sa_ids: '1422', ticker: 'MRK', price: 115.38, company: 'Merck & Co., Inc.   ' },
  { sa_ids: '14539', ticker: 'AVGO', price: 867.43, company: 'Broadcom Inc.' },
  { sa_ids: '2182', ticker: 'DHI', price: 121.69, company: 'D.R. Horton, Inc.' },
  { sa_ids: '1032', ticker: 'PEP', price: 185.14, company: 'PepsiCo, Inc.' },
  { sa_ids: '1212', ticker: 'CVS', price: 69.13, company: 'CVS Health Corporation' },
  { sa_ids: '903', ticker: 'MA', price: 393.3, company: 'Mastercard Incorporated    ' },
  { sa_ids: '9691', ticker: 'V', price: 237.48, company: 'Visa Inc.' },
  { sa_ids: '907', ticker: 'JPM', price: 145.44, company: 'JPMorgan Chase & Co.' },
  { sa_ids: '1150', ticker: 'NVDA', price: 423.02, company: 'NVIDIA Corporation' },
  { sa_ids: '1719', ticker: 'UNH', price: 480.64, company: 'UnitedHealth Group Incorporated' },
  { sa_ids: '562', ticker: 'AMZN', price: 130.36, company: 'Amazon.com, Inc.' },
  { sa_ids: '1135', ticker: 'JNJ', price: 165.34, company: 'Johnson & Johnson' },
  { sa_ids: '146', ticker: 'AAPL', price: 164.9, company: 'Apple Inc.' },
  { sa_ids: '544', ticker: 'GOOG', price: 120.97, company: 'Alphabet Inc.' },
  { sa_ids: '1421', ticker: 'LLY', price: 468.98, company: 'Eli Lilly and Company' },
]
@Injectable()
export class TasksService {
  @Cron('*/30 20-23 * * 1-5', { timeZone: 'Asia/Bangkok' })
  async checkCurrentPriceStockFromSuperInvestor2() {
    try {
      await this.handleCheckPriceRealTime()
    } catch (error) {}
  }

  @Cron('*/30 0-2 * * 2-6', { timeZone: 'Asia/Bangkok' })
  async checkCurrentPriceStockFromSuperInvestor3() {
    try {
      await this.handleCheckPriceRealTime()
    } catch (error) {}
  }

  async handleCheckPriceRealTime() {
    try {
      for (let index = 0; index < stocks.length; index++) {
        const stock = stocks[index]
        const { data: response } = await axios.get<RealTimeQuote>(
          `https://finance-api.seekingalpha.com/real_time_quotes?sa_ids=${stock.sa_ids}`,
        )
        const { real_time_quotes } = response
        const quote = real_time_quotes[0]

        if (quote.last <= stock.price) {
          const difference = ((stock.price - quote.last) / stock.price) * 100
          const message = `\`${stock.ticker}\` - \`${difference.toFixed(2)}%\`\n\`\`\`🎯Target: ${
            stock.price
          } | 🚴‍♂️Current: ${quote.last}\`\`\`\nCompany: ${stock.company}`
          await sendLineNotify(message, 'clzhHdxVZ6FULIQJ42HGcToNjUIjRMbDmPsyEKdBpKR')
        }
      }
    } catch (error) {
      await sendLineNotify(error.message, 'clzhHdxVZ6FULIQJ42HGcToNjUIjRMbDmPsyEKdBpKR')
    }
  }
}
