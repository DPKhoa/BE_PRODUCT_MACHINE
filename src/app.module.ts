/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BrandModule } from './brand/brand.module';
import { CategoriesModule } from './categories/categories.module';
import config from '../ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...config, autoLoadEntities: true }),
    BrandModule,
    CategoriesModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
