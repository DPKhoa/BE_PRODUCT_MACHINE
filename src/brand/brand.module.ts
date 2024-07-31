/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from 'output/entities/Brand';
import { Category } from 'output/entities/Category';

@Module({
  imports: [TypeOrmModule.forFeature([Brand, Category])],
  controllers: [BrandController],
  providers: [BrandService],
})
export class BrandModule {}
