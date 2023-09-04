import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { ExchangesService } from './exchanges.service'
import { CreateExchangeRequest, UpdateExchangeRequest } from './requests/create-exchange.request'
import { ExchangeResponse } from './responses/exchange.response'
import { ExchangeQuery } from './requests/query-exchange.request'

@Controller('exchanges')
export class ExchangesController {
  constructor(private readonly exchangesService: ExchangesService) {}

  @Get('list')
  getAll(): Promise<ExchangeResponse[]> {
    return this.exchangesService.getAll()
  }

  @Get('portfolio/:portfolioId')
  getAllByPortfolioId(
    @Param('portfolioId') portfolioId: string,
    @Query() query: ExchangeQuery,
  ): Promise<ExchangeResponse[]> {
    return this.exchangesService.getAllByPortfolioId(portfolioId, query)
  }

  @Get(':id')
  get(@Param('id') id: string): Promise<ExchangeResponse> {
    return this.exchangesService.get(id)
  }

  @Post()
  create(@Body() createRequest: CreateExchangeRequest): Promise<ExchangeResponse> {
    return this.exchangesService.create(createRequest)
  }

  @Put()
  update(@Body() updateRequest: UpdateExchangeRequest): Promise<ExchangeResponse> {
    return this.exchangesService.update(updateRequest)
  }

  // @Delete('all')
  // deleteAll(): Promise<void> {
  //   return this.exchangesService.deleteAll()
  // }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<ExchangeResponse> {
    return this.exchangesService.delete(id)
  }
}
