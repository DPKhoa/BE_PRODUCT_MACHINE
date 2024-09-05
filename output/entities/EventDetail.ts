/* eslint-disable prettier/prettier */
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Product } from './Product';
import { Event } from './Event';

@Entity('EVENT_DETAIL', { schema: 'dbo' })
export class EventDetail {
  @Column('int', { primary: true, name: 'product_id' })
  productId: number;

  @Column('int', { primary: true, name: 'event_id' })
  eventId: number;

  @ManyToOne(() => Product, (product) => product.eventDetail)
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'productId' }])
  product: Product;

  @ManyToOne(() => Event, (event) => event.eventDetail)
  @JoinColumn([{ name: 'event_id', referencedColumnName: 'eventId' }])
  events: Event;
}
