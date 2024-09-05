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
  HttpException,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post('createEvent')
  async createEvent(@Body() createEventDto: CreateEventDto) {
    try {
      return {
        status: 'success',
        code: 200,
        data: await this.eventsService.createEvent(createEventDto),
      };
    } catch (error) {
      throw new BadRequestException('Validation failed');
    }
  }

  @Get('getAllEvent')
  async getAllEvent() {
    try {
      const events = await this.eventsService.getAllEvents();
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
      throw new HttpException(
        {
          status: 'error',
          code: 500,
          message: 'Internal server error',
          description: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('getEventBy/:id')
  getEventById(@Param('id') id: string) {
    return this.eventsService.getEventById(+id);
  }

  @Patch(':id')
  async updateEvent(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
  ) {
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
