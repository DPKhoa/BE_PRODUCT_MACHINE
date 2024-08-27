/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from 'output/entities/Event';
import { Repository } from 'typeorm';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}
  async createEvent(createEventDto: CreateEventDto): Promise<Event> {
    // const { price, discount, ...eventDetails } = createEventDto;
    // const cost =
    //   price && discount ? price - price * (discount / 100) : price || 0;

    // const event = this.eventRepository.create({
    //   ...eventDetails,

    //   discount,
    //   cost,
    //   status: eventDetails.status !== undefined ? eventDetails.status : true, // Default to true if not provided
    // });

    // const saveEvent = this.eventRepository.save(event);
    return;
  }

  findAll(): Promise<Event[]> {
    // const events = this.eventRepository.find({
    //   where: { status: true },
    // });
    // return events;
    return;
  }

  async findOne(id: number): Promise<Event> {
    // const event = await this.eventRepository.findOne({ where: { id } });
    // if (!event) {
    //   throw new NotFoundException(`Event with ID ${id} not found`);
    // }
    return;
  }

  async updateEvent(id: number, updateEventDto: UpdateEventDto) {
    // const event = await this.eventRepository.findOne({ where: { id } });
    // if (!event) {
    //   throw new NotFoundException(`Event with ID ${id} not found`);
    // }
    // Object.assign(event, updateEventDto);
    // return this.eventRepository.save(event);
  }

  async deleteEvent(eventId: number): Promise<{ message: string }> {
    // const event = await this.eventRepository.findOne({ where: { eventId } });
    // if (!event) {
    //   throw new NotFoundException(`Event with eventId ${eventId} not found`);
    // }
    // const result = this.eventRepository.delete(id);
    // if ((await result).affected === 0) {
    //   throw new NotFoundException(`Event with ID ${id} not found`);
    // }
    return { message: `Event with ID as been successfully removed` };
  }
}
