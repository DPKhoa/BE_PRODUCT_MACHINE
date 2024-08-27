/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BrandModule } from './brand/brand.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { EventsModule } from './events/events.module';
import { ImgProductModule } from './img_product/img_product.module';
import { ComboModule } from './combo/combo.module';
import { ComboDetailModule } from './combo_detail/combo_detail.module';
import { GoodsModule } from './goods/goods.module';
import { GoodsDetailModule } from './goods-detail/goods-detail.module';
import { OrderModule } from './order/order.module';
import { OrderDetailsModule } from './order-details/order-details.module';
import { InvoicesModule } from './invoices/invoices.module';

import config from '../ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...config, autoLoadEntities: true }),
    BrandModule,
    CategoriesModule,
    ProductsModule,
    EventsModule,
    ImgProductModule,
    ComboModule,
    ComboDetailModule,
    GoodsModule,
    GoodsDetailModule,
    OrderModule,
    OrderDetailsModule,
    InvoicesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
