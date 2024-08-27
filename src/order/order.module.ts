/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'output/entities/Order';
import { OrderDetail } from 'output/entities/OrderDetail';
import { Invoice } from 'output/entities/Invoice';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderDetail, Invoice])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
