/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { Brand } from 'output/entities/Brand';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'output/entities/Product';

@Module({
  imports: [TypeOrmModule.forFeature([Brand, Product])],
  controllers: [BrandController],
  providers: [BrandService],
})
export class BrandModule {}
