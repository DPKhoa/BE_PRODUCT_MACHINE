/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { GoodsService } from './goods.service';
import { GoodsController } from './goods.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoodsDetail } from 'output/entities/GoodsDetail';
import { Goods } from 'output/entities/Goods';

@Module({
  imports: [TypeOrmModule.forFeature([GoodsDetail, Goods])],
  controllers: [GoodsController],
  providers: [GoodsService],
})
export class GoodsModule {}
