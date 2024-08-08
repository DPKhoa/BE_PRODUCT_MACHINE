/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ImgProductService } from './img_product.service';
import { ImgProductController } from './img_product.controller';
import { ImgProduct } from 'output/entities/ImgProduct';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'output/entities/Product';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ImgProduct])],
  controllers: [ImgProductController],
  providers: [ImgProductService],
})
export class ImgProductModule {}
