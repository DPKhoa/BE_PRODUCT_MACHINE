/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from 'output/entities/Brand';
import { Category } from 'output/entities/Category';
import { Product } from 'output/entities/Product';

@Module({
  imports: [TypeOrmModule.forFeature([Brand, Category, Product])],
  controllers: [BrandController],
  providers: [BrandService],
})
export class BrandModule {}
