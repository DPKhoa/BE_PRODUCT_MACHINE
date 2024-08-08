/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'output/entities/Product';
import { Event } from 'output/entities/Event';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Event])],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
