/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { GoodsDetailService } from './goods-detail.service';
import { GoodsDetailController } from './goods-detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Goods } from 'output/entities/Goods';
import { GoodsDetail } from 'output/entities/GoodsDetail';

@Module({
  imports: [TypeOrmModule.forFeature([Goods, GoodsDetail])],
  controllers: [GoodsDetailController],
  providers: [GoodsDetailService],
})
export class GoodsDetailModule {}
