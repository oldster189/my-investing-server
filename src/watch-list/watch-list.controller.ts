import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { AddStockWatchListRequest } from './requests/add-stock-watch-list.request'
import { CreateWatchListRequest, UpdateWatchListRequest } from './requests/create-watch-list.request'
import { WatchListResponse } from './responses/watch-list.response'
import { WatchListService } from './watch-list.service'

@Controller('watch-list')
export class WatchListController {
  constructor(private readonly watchListService: WatchListService) {}

  @Get('list')
  getAll(): Promise<WatchListResponse[]> {
    return this.watchListService.getAll()
  }

  @Get(':id')
  get(@Param('id') id: string): Promise<WatchListResponse> {
    return this.watchListService.get(id)
  }

  @Post()
  create(@Body() createRequest: CreateWatchListRequest): Promise<WatchListResponse> {
    return this.watchListService.create(createRequest)
  }

  @Put('add')
  add(@Body() addRequest: AddStockWatchListRequest): Promise<WatchListResponse> {
    return this.watchListService.add(addRequest)
  }

  @Put()
  update(@Body() updateRequest: UpdateWatchListRequest): Promise<WatchListResponse> {
    return this.watchListService.update(updateRequest)
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<WatchListResponse> {
    return this.watchListService.delete(id)
  }
}
