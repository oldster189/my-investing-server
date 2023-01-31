import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { PortfolioService } from './portfolio.service'
import { CreatePortfolioRequest, UpdatePortfolioRequest } from './requests/create-portfolio.request'
import { PortfolioResponse } from './responses/portfolio.response'

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Get('list')
  getAll(): Promise<PortfolioResponse[]> {
    return this.portfolioService.getAll()
  }

  @Get(':id')
  get(@Param('id') id: string): Promise<PortfolioResponse> {
    return this.portfolioService.get(id)
  }

  @Post()
  create(@Body() createRequest: CreatePortfolioRequest): Promise<PortfolioResponse> {
    return this.portfolioService.create(createRequest)
  }

  @Put()
  update(@Body() updateRequest: UpdatePortfolioRequest): Promise<PortfolioResponse> {
    return this.portfolioService.update(updateRequest)
  }

  @Delete()
  delete(@Param('id') id: string): Promise<PortfolioResponse> {
    return this.portfolioService.delete(id)
  }
}
