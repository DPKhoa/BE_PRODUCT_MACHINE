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

  @Post('createCategory')
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get('getAllCategory')
  async findAll() {
    try {
      const result = await this.categoriesService.findAll();
      if (!result || result.length === 0) {
        throw new BadRequestException('No brands found');
      }
      return {
        status: 'success',
        code: 200,
        message: 'All brands retrieved successfully',
        data: result,
      };
    } catch (error) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: 'Some error description ',
      });
    }
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

  @Delete('deleteCategory/:id')
  async deleteCategory(
    @Param('id', ParseIntPipe) id: number,
    @Res() res,
  ): Promise<void> {
    const result = await this.categoriesService.deleteCategory(id);
    res.status(HttpStatus.OK).json(result);
  }
}
