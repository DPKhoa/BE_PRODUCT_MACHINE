/* eslint-disable prettier/prettier */
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { EventDetail } from './EventDetail';

@Index('UQ__EVENT__2370F7268B1993F5', ['eventId'], { unique: true })
@Entity('EVENT', { schema: 'dbo' })
export class Event {
  @Column('nvarchar', { name: 'name', nullable: true, length: 255 })
  name: string | null;

  @Column('int', { name: 'cost', nullable: true })
  cost: number | null;

  @Column('nvarchar', { name: 'image', nullable: true, length: 255 })
  image: string | null;

  @Column('int', { name: 'price', nullable: true })
  price: number | null;

  @Column('int', { name: 'discount', nullable: true })
  discount: number | null;

  @PrimaryGeneratedColumn({ type: 'int', name: 'event_id' })
  eventId: number;

  @Column('bit', { name: 'status', nullable: true })
  status: boolean | null;

  @OneToMany(() => EventDetail, (eventDetail) => eventDetail.events)
  eventDetail: EventDetail[];
}
