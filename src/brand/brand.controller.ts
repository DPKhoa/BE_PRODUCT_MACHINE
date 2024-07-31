/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from 'output/entities/Brand';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post('createBrand')
  create(@Body() createBrandDto: CreateBrandDto): Promise<Brand> {
    return this.brandService.create(createBrandDto);
  }

  @Get('/getAllBrand')
  async findAll(): Promise<{ brands: Brand[] }> {
    return this.brandService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.brandService.findOne(+id);
  }

  @Patch('updateBrand/:id')
  async updateBrand(
    @Param('id') id: number,
    @Body() updateBrandDto: UpdateBrandDto,
  ) {
    return this.brandService.updateBrand(+id, updateBrandDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.brandService.remove(+id);
  }
}
