/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ComboDetailService } from './combo_detail.service';
import { ComboDetailController } from './combo_detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Combo } from 'output/entities/Combo';
import { ComboDetail } from 'output/entities/ComboDetail';
import { Product } from 'output/entities/Product';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Combo, ComboDetail])],

  controllers: [ComboDetailController],
  providers: [ComboDetailService],
})
export class ComboDetailModule {}
