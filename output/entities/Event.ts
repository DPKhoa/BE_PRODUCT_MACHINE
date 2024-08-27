import { Column, Entity, Index, ManyToMany } from 'typeorm';
import { Product } from './Product';

@Index('UQ__EVENT__2370F7268B1993F5', ['eventId'], { unique: true })
@Entity('EVENT', { schema: 'dbo' })
export class Event {
  @Column('int', { primary: true, name: 'event_id' })
  eventId: number;

  @Column('nchar', { name: 'discount', nullable: true, length: 10 })
  discount: string | null;

  @Column('nvarchar', { name: 'name', nullable: true, length: 255 })
  name: string | null;

  @Column('int', { name: 'cost', nullable: true })
  cost: number | null;

  @Column('nvarchar', { name: 'image', nullable: true, length: 255 })
  image: string | null;

  @Column('int', { name: 'price', nullable: true })
  price: number | null;

  @Column('char', { name: 'status', nullable: true, length: 10 })
  status: string | null;

  @ManyToMany(() => Product, (product) => product.events)
  products: Product[];
}
