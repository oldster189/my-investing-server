import { sendLineNotify } from './../utils/send-line.util'
import { Injectable } from '@nestjs/common'
import axios from 'axios'
import { FollowSuperInvestor, RealTimeQuote } from 'src/watch-lists/responses/follow-super-investor'

const stocks: FollowSuperInvestor[] = [
  { sa_ids: '1715', ticker: 'ASML', targetPrice: 724.75, company: 'ASML Holding N.V.' },
  { sa_ids: '1534', ticker: 'TSM', targetPrice: 100.92, company: 'Taiwan Semiconductor Manufacturing Company Limited' },
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
  { sa_ids: '544', ticker: 'GOOG', targetPrice: 120.97, company: 'Alphabet Inc.' },
  { sa_ids: '1421', ticker: 'LLY', targetPrice: 468.98, company: 'Eli Lilly and Company' },
  { sa_ids: '92371', ticker: 'ABBV', targetPrice: 134.73, company: 'AbbVie Inc.' },
  { sa_ids: '3133', ticker: 'APD', targetPrice: 299.53, company: 'Air Products and Chemicals, Inc.' },
  { sa_ids: '2109', ticker: 'CI', targetPrice: 280.6, company: 'The Cigna Group' },
]

@Injectable()
export class TasksService {
  // @Cron('5,35 20-23 * * 1-5', { timeZone: 'Asia/Bangkok' })
  async checkCurrentPriceStockFromSuperInvestor2() {
    try {
      await this.handleCheckPriceRealTime()
    } catch (error) {}
  }

  // @Cron('*/30 0-2 * * 2-6', { timeZone: 'Asia/Bangkok' })
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

        if (quote.last <= stock.targetPrice) {
          const difference = ((stock.targetPrice - quote.last) / stock.targetPrice) * 100
          const message = `\`${stock.ticker}\` - \`${difference.toFixed(2)}%\`\n\`\`\`🎯Target: ${
            stock.targetPrice
          } | 🚴‍♂️Current: ${quote.last}\`\`\`\nCompany: ${stock.company}`
          await sendLineNotify(message, 'clzhHdxVZ6FULIQJ42HGcToNjUIjRMbDmPsyEKdBpKR')
        }
      }
    } catch (error) {
      await sendLineNotify(error.message, 'clzhHdxVZ6FULIQJ42HGcToNjUIjRMbDmPsyEKdBpKR')
    }
  }
}
