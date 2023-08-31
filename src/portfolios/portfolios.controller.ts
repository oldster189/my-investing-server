import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { PortfoliosService } from './portfolios.service'
import { AddStockPortfolioRequest } from './requests/add-stock-portfolio.request'
import { CreatePortfolioRequest, UpdatePortfolioRequest } from './requests/create-portfolio.request'
import { PortfolioResponse } from './responses/portfolio.response'

@Controller('portfolios')
export class PortfoliosController {
  constructor(private readonly portfoliosService: PortfoliosService) {}

  @Get('list')
  getAll(): Promise<PortfolioResponse[]> {
    return this.portfoliosService.getAll()
  }

  @Get(':id')
  get(@Param('id') id: string): Promise<PortfolioResponse> {
    return this.portfoliosService.get(id)
  }

  @Post('add/stock')
  addStock(@Body() createRequest: AddStockPortfolioRequest): Promise<PortfolioResponse> {
    return this.portfoliosService.addStock(createRequest)
  }

  @Post()
  create(@Body() createRequest: CreatePortfolioRequest): Promise<PortfolioResponse> {
    return this.portfoliosService.create(createRequest)
  }

  @Put()
  update(@Body() updateRequest: UpdatePortfolioRequest): Promise<PortfolioResponse> {
    return this.portfoliosService.update(updateRequest)
  }

  @Put('update/stock')
  updateStock(@Body() updateRequest: UpdatePortfolioRequest): Promise<PortfolioResponse> {
    return this.portfoliosService.updateStock(updateRequest)
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<PortfolioResponse> {
    return this.portfoliosService.delete(id)
  }
}
