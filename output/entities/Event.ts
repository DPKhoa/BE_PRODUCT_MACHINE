import {
  Column,
  Entity,
  Index,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './Product';

@Index('UQ__EVENT__2370F7268B1993F5', ['eventId'], { unique: true })
@Entity('EVENT', { schema: 'dbo' })
export class Event {
  @PrimaryGeneratedColumn({ type: 'int', name: 'event_id' })
  eventId: number;

  @Column('int', { name: 'discount', nullable: true })
  discount: number | null;

  @Column('nvarchar', { name: 'name', nullable: true, length: 255 })
  name: string | null;

  @Column('int', { name: 'cost', nullable: true })
  cost: number | null;

  @Column('nvarchar', { name: 'image', nullable: true, length: 255 })
  image: string | null;

  @Column('int', { name: 'price', nullable: true })
  price: number | null;

  @Column('bit', { name: 'status', nullable: true })
  status: boolean; // Ensure this matches your DTO

  @ManyToMany(() => Product, (product) => product.events)
  products: Product[];
}
