/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ComboService } from './combo.service';
import { ComboController } from './combo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Combo } from 'output/entities/Combo';

@Module({
  imports: [TypeOrmModule.forFeature([Combo])],

  controllers: [ComboController],
  providers: [ComboService],
})
export class ComboModule {}
