import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { AddStockWatchListRequest } from './requests/add-stock-watch-list.request'
import { CreateWatchListRequest, UpdateWatchListRequest } from './requests/create-watch-list.request'
import { WatchListResponse } from './responses/watch-list.response'
import { WatchListsService } from './watch-lists.service'

@Controller('watch-lists')
export class WatchListsController {
  constructor(private readonly watchListsService: WatchListsService) {}

  @Get('list')
  getAll(): Promise<WatchListResponse[]> {
    return this.watchListsService.getAll()
  }

  @Get(':id')
  get(@Param('id') id: string): Promise<WatchListResponse> {
    return this.watchListsService.get(id)
  }

  @Post()
  create(@Body() createRequest: CreateWatchListRequest): Promise<WatchListResponse> {
    return this.watchListsService.create(createRequest)
  }

  @Put('add')
  add(@Body() addRequest: AddStockWatchListRequest): Promise<WatchListResponse> {
    return this.watchListsService.add(addRequest)
  }

  @Put()
  update(@Body() updateRequest: UpdateWatchListRequest): Promise<WatchListResponse> {
    return this.watchListsService.update(updateRequest)
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<WatchListResponse> {
    return this.watchListsService.delete(id)
  }
}
