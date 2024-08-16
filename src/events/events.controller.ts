/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from 'output/entities/Event';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post('createEvent')
  async create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.createEvent(createEventDto);
  }

  @Get('getAllEvent')
  async findAll(): Promise<Event[]> {
    return this.eventsService.findAll();
  }

  @Get('getEventBy/:id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.updateEvent(+id, updateEventDto);
  }

  @Delete('deleteEvent/:id')
  async deleteEvent(
    @Param('id', ParseIntPipe) id: number,
    @Res() res,
  ): Promise<void> {
    const result = await this.eventsService.deleteEvent(id);
    res.status(HttpStatus.OK).json(result);
  }
}
