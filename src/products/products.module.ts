/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from 'output/entities/Product';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from 'output/entities/Brand';
import { Category } from 'output/entities/Category';
import { GoodsDetail } from 'output/entities/GoodsDetail';
import { OrderDetail } from 'output/entities/OrderDetail';
import { EventDetail } from 'output/entities/EventDetail';
import { Event } from 'output/entities/Event';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      Brand,
      Category,
      Event,
      GoodsDetail,
      OrderDetail,
      EventDetail,
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
