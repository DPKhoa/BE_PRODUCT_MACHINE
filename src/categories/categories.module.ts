/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'output/entities/Category';
import { Brand } from 'output/entities/Brand';
import { Product } from 'output/entities/Product';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Brand, Product])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
