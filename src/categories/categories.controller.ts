/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Res,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import CreateCategoryDto from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  //createCategory
  @Post('createCategory')
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.createCategory(createCategoryDto);
  }

  //getAllCategory
  @Get('getAllCategory')
  async getAllCategory() {
    try {
      const result = await this.categoriesService.getAllCategory();
      if (!result || result.length === 0) {
        throw new BadRequestException('No categories found');
      }
      return {
        status: 'success',
        code: 200,
        message: 'All categories retrieved successfully',
        data: result,
      };
    } catch (error) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: 'Some error description ',
      });
    }
  }

  //getCategoryById
  @Get(':id')
  getCategoryById(@Param('id') id: number) {
    return this.categoriesService.getCategoryById(+id);
  }

  //updateCategory
  @Patch('updateCategory/:id')
  async updateCategory(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.updateCategory(+id, updateCategoryDto);
  }
  //deleteCategory
  @Delete('deleteCategory/:id')
  async deleteCategory(
    @Param('id', ParseIntPipe) id: number,
    @Res() res,
  ): Promise<void> {
    const result = await this.categoriesService.deleteCategory(id);
    res.status(HttpStatus.OK).json(result);
  }
}
