/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from 'output/entities/Product';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from 'output/entities/Brand';
import { Category } from 'output/entities/Category';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Brand, Category,Event])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
