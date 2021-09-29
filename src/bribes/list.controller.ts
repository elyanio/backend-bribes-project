/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { NumberList } from './interfaces/number-list.dto';
import { List } from './list.entity';
import { ListService } from './list.service';

@Controller()
export class ListController {
  constructor(private readonly listService: ListService) { }

  @Get("/get-bribes")
  getBribes(@Query() numberList: NumberList): { bribes: number | string } {
    try {
      const bribes = this.listService.getBribes(numberList.q);
      return { bribes }
    } catch (error) {
      return { bribes: (error as Error).message };
    }
  }

  @Post("/list")
  postList(@Body() numberList: NumberList): Promise<List> {
    return this.listService.saveList(numberList);
  }

  @Get("/list/:id")
  getList(@Param() id: string): Promise<List> {
    return this.listService.getList(id);
  }

  @Patch("/list/:id")
  putList(@Param() id: string, @Body() numberList: NumberList): Promise<UpdateResult> {
    return this.listService.patchList(id, numberList);
  }

  @Delete("/list/:id")
  deleteList(@Param() id: string): Promise<DeleteResult> {
    return this.listService.deleteList(id);
  }

  @Get("/get-all-list")
  getAllList(): Promise<List[]> {
    return this.listService.getAllList();
  }
}