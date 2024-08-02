/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'output/entities/Category';
import { Brand } from 'output/entities/Brand';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Brand])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
