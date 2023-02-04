import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { CreateTransactionRequest, UpdateTransactionRequest } from './requests/create-transaction.request'
import { TransactionResponse } from './responses/transaction.response'
import { TransactionsService } from './transactions.service'

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get('list')
  getAll(): Promise<TransactionResponse[]> {
    return this.transactionsService.getAll()
  }

  @Get(':id')
  get(@Param('id') id: string): Promise<TransactionResponse> {
    return this.transactionsService.get(id)
  }

  @Post()
  create(@Body() createRequest: CreateTransactionRequest): Promise<TransactionResponse> {
    return this.transactionsService.create(createRequest)
  }

  @Put()
  update(@Body() updateRequest: UpdateTransactionRequest): Promise<TransactionResponse> {
    return this.transactionsService.update(updateRequest)
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<TransactionResponse> {
    return this.transactionsService.delete(id)
  }
}
