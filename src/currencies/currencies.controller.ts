import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { CurrenciesService } from './currencies.service'
import { CreateCurrencyRequest, UpdateCurrencyRequest } from './requests/create-currency.request'
import { CurrencyResponse } from './responses/currency.response'

@Controller('currencies')
export class CurrenciesController {
  constructor(private readonly currenciesService: CurrenciesService) {}

  @Get('list')
  getAll(): Promise<CurrencyResponse[]> {
    return this.currenciesService.getAll()
  }

  @Get(':id')
  get(@Param('id') id: string): Promise<CurrencyResponse> {
    return this.currenciesService.get(id)
  }

  @Post()
  create(@Body() createRequest: CreateCurrencyRequest): Promise<CurrencyResponse> {
    return this.currenciesService.create(createRequest)
  }

  @Put()
  update(@Body() updateRequest: UpdateCurrencyRequest): Promise<CurrencyResponse> {
    return this.currenciesService.update(updateRequest)
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<CurrencyResponse> {
    return this.currenciesService.delete(id)
  }
}
