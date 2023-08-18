import { sendLineNotify } from './../utils/send-line.util'
import { Injectable } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'

@Injectable()
export class TasksService {
  @Cron(CronExpression.EVERY_3_HOURS)
  async checkCurrentPriceStockFromSuperInvestor() {
    try {
      sendLineNotify('test', 'ZYbjAHGznzVLn9rbrbnanxVuVRHNUclOAKntahtdR4f')
    } catch (error) {}
  }
}
