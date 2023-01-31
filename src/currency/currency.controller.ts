import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { CurrencyService } from './currency.service'
import { CreateCurrencyRequest, UpdateCurrencyRequest } from './requests/create-currency.request'
import { CurrencyResponse } from './responses/currency.response'

@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get('list')
  getAll(): Promise<CurrencyResponse[]> {
    return this.currencyService.getAll()
  }

  @Get(':id')
  get(@Param('id') id: string): Promise<CurrencyResponse> {
    return this.currencyService.get(id)
  }

  @Post()
  create(@Body() createRequest: CreateCurrencyRequest): Promise<CurrencyResponse> {
    return this.currencyService.create(createRequest)
  }

  @Put()
  update(@Body() updateRequest: UpdateCurrencyRequest): Promise<CurrencyResponse> {
    return this.currencyService.update(updateRequest)
  }

  @Delete()
  delete(@Param('id') id: string): Promise<CurrencyResponse> {
    return this.currencyService.delete(id)
  }
}
