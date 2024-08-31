/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from 'output/entities/Brand';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post('createBrand')
  async create(@Body() createBrandDto: CreateBrandDto): Promise<Brand> {
    return await this.brandService.create(createBrandDto);
  }

  @Get('getAllBrand')
  async findAll() {
    try {
      const result = await this.brandService.findAll();
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
  @Get('getBrandBy/:id')
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

  @Delete('deleteBrand/:id')
  async deleteBrand(
    @Param('id', ParseIntPipe) id: number,
    @Res() res,
  ): Promise<void> {
    const result = await this.brandService.deleteBrand(+id);
    res.status(HttpStatus.OK).json(result);
  }
}
