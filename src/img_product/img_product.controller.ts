import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ImgProductService } from './img_product.service';
import { CreateImgProductDto } from './dto/create-img_product.dto';
import { UpdateImgProductDto } from './dto/update-img_product.dto';

@Controller('img-product')
export class ImgProductController {
  constructor(private readonly imgProductService: ImgProductService) {}

  @Post()
  create(@Body() createImgProductDto: CreateImgProductDto) {
    return this.imgProductService.create(createImgProductDto);
  }

  @Get()
  findAll() {
    return this.imgProductService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imgProductService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImgProductDto: UpdateImgProductDto) {
    return this.imgProductService.update(+id, updateImgProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imgProductService.remove(+id);
  }
}
