/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  BadRequestException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from 'output/entities/Product';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('createProduct')
  @UsePipes(new ValidationPipe({ transform: true }))
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto);
  }

  @Get('getAllProducts')
  async findAllProducts() {
    try {
      const result = await this.productsService.getAllProducts();
      return {
        status: 'success',
        code: 200,
        message: 'All products retrieved successfully',
        data: result.products, // Use ProductResponseDto[] here
      };
    } catch (error) {
      throw new BadRequestException({
        status: 'error',
        code: 400,
        message: 'Failed to retrieve products',
        description: error.message,
      });
    }
  }

  @Get('getProductBy/:id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Patch('updateProduct/:id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.updateProduct(+id, updateProductDto);
  }

  @Delete(':id')
  async deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.deleteProduct(id);
  }
}
