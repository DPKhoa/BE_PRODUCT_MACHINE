/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { Category } from 'output/entities/Category';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'output/entities/Product';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Product])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
