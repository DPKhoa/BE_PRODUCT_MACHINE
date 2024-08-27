/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { GoodsService } from './goods.service';
import { GoodsController } from './goods.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoodsDetail } from 'output/entities/GoodsDetail';
import { Good } from './entities/good.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GoodsDetail, Good])],
  controllers: [GoodsController],
  providers: [GoodsService],
})
export class GoodsModule {}
