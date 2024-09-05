/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from 'output/entities/Event';
import { Repository } from 'typeorm';
import { EventResponseDto } from './dto/event-reponse.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}
  async createEvent(createEventDto: CreateEventDto): Promise<Event> {
    const { price, discount, ...eventDetails } = createEventDto;

    // Ensure discount is a number and convert to percentage if needed
    const cost =
      price && discount ? price - price * (discount / 100) : price || 0;
    const event = this.eventRepository.create({
      ...eventDetails,
      discount,
      cost,
      price,
      status: eventDetails.status !== undefined ? eventDetails.status : true, // Default to true if not provided
    });

    const saveEvent = this.eventRepository.save(event);
    return saveEvent;
  }

  async getAllEvents(): Promise<EventResponseDto[]> {
    try {
      const events = await this.eventRepository.find();
      return events.map((event) => ({
        eventId: event.eventId,
        discount: event.discount,
        name: event.name,
        cost: event.cost,
        image: event.image,
        price: event.price,
        status: event.status,
      }));
    } catch (error) {
      throw new BadRequestException('Failed to retrieve events');
    }
  }

  async getEventById(eventId: number): Promise<Event> {
    const event = await this.eventRepository.findOne({ where: { eventId } });
    if (!event) {
      throw new NotFoundException(`Event with ID ${eventId} not found`);
    }
    return event;
  }

  async updateEvent(eventId: number, updateEventDto: UpdateEventDto) {
    const event = await this.eventRepository.findOne({ where: { eventId } });
    if (!event) {
      throw new NotFoundException(`Event with ID ${eventId} not found`);
    }
    Object.assign(event, updateEventDto);
    return this.eventRepository.save(event);
  }

  async deleteEvent(eventId: number): Promise<{ message: string }> {
    const event = await this.eventRepository.findOne({ where: { eventId } });
    if (!event) {
      throw new NotFoundException(`Event with eventId ${eventId} not found`);
    }
    const result = this.eventRepository.delete(eventId);
    if ((await result).affected === 0) {
      throw new NotFoundException(`Event with ID ${eventId} not found`);
    }
    return { message: `Event with ID as been successfully removed` };
  }
}
