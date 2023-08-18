import { sendLineNotify } from './../utils/send-line.util'
import { Injectable } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'

@Injectable()
export class TasksService {
  @Cron(CronExpression.EVERY_10_SECONDS)
  async checkCurrentPriceStockFromSuperInvestor() {
    try {
      sendLineNotify('test', 'NTGFpYYz6MZ1mHUFRw27hAmxjW0BkkTBL33J1ceqLn9')
    } catch (error) {}
  }
}
