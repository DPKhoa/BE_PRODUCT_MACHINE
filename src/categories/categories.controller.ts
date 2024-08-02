/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import CreateCategoryDto from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from 'output/entities/Category';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post('createCategory')
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get('getAllCategory')
  async findAll(): Promise<{ categories: Category[] }> {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.categoriesService.findOne(+id);
  }

  @Patch('updateCategory/:id')
  async updateCategory(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.updateCategory(+id, updateCategoryDto);
  }

  // @Delete(':id/brand/:idBrand')
  // async deleteCategory(
  //   @Param('id') id: number,
  //   @Param('idBrand') idBrand: number,
  // ): Promise<string> {
  //   console.log('Deleting category with ID:', id, 'and Brand ID:', idBrand);
  //   return this.categoriesService.deleteCategory(id, idBrand);
  // }
}
