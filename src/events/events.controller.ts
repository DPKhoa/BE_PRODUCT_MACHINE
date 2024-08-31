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
  BadRequestException,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post('createEvent')
  async create(@Body() createEventDto: CreateEventDto) {
    try {
      return {
        status: 'success',
        data: await this.eventsService.createEvent(createEventDto),
      };
    } catch (error) {
      throw new BadRequestException('Validation failed');
    }
  }

  @Get('getAllEvent')
  async findAll() {
    try {
      const events = await this.eventsService.findAll();
      if (!events || events.length === 0) {
        throw new BadRequestException('No events found');
      }
      return {
        status: 'success',
        code: 200,
        message: 'All events retrieved successfully',
        data: events,
      };
    } catch (error) {
      throw (
        (new BadRequestException('Something bad happened'),
        {
          cause: new Error(),
          description: 'Some error description',
        })
      );
    }
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
