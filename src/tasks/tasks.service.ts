import { sendLineNotify } from './../utils/send-line.util'
import { Injectable } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'

@Injectable()
export class TasksService {
  @Cron(CronExpression.EVERY_30_MINUTES)
  async checkCurrentPriceStockFromSuperInvestor() {
    try {
      sendLineNotify('test', 'clzhHdxVZ6FULIQJ42HGcToNjUIjRMbDmPsyEKdBpKR')
    } catch (error) {}
  }
}
