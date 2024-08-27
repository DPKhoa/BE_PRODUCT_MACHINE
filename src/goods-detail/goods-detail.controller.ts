import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GoodsDetailService } from './goods-detail.service';
import { CreateGoodsDetailDto } from './dto/create-goods-detail.dto';
import { UpdateGoodsDetailDto } from './dto/update-goods-detail.dto';

@Controller('goods-detail')
export class GoodsDetailController {
  constructor(private readonly goodsDetailService: GoodsDetailService) {}

  @Post()
  create(@Body() createGoodsDetailDto: CreateGoodsDetailDto) {
    return this.goodsDetailService.create(createGoodsDetailDto);
  }

  @Get()
  findAll() {
    return this.goodsDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.goodsDetailService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGoodsDetailDto: UpdateGoodsDetailDto) {
    return this.goodsDetailService.update(+id, updateGoodsDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.goodsDetailService.remove(+id);
  }
}
