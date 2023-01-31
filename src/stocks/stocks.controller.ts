import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { CreateStocksRequest, UpdateStocksRequest } from './requests/create-stocks.request'
import { StocksResponse } from './responses/stocks.response'
import { StocksService } from './stocks.service'

@Controller('stocks')
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  @Get('info')
  fetchStockInfo(@Query('symbol') symbol: string): Promise<any> {
    return this.stocksService.getStockInfo(symbol)
  }

  @Get('suggestion')
  suggestionStockList(@Query('symbol') symbol: string): Promise<any> {
    return this.stocksService.suggestionStockList(symbol)
  }

  @Get('list')
  getAll(): Promise<StocksResponse[]> {
    return this.stocksService.getAll()
  }

  @Get(':id')
  get(@Param('id') id: string): Promise<StocksResponse> {
    return this.stocksService.get(id)
  }

  @Post()
  create(@Body() createRequest: CreateStocksRequest): Promise<StocksResponse> {
    return this.stocksService.create(createRequest)
  }

  @Put()
  update(@Body() updateRequest: UpdateStocksRequest): Promise<StocksResponse> {
    return this.stocksService.update(updateRequest)
  }

  @Delete()
  delete(@Param('id') id: string): Promise<StocksResponse> {
    return this.stocksService.delete(id)
  }
}
