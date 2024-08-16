import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './Product';

@Index('PK__EVENT__3213E83FCE43D66C', ['id'], { unique: true })
@Index('UQ__EVENT__3213E83E05D83904', ['id'], { unique: true })
@Entity('EVENT', { schema: 'dbo' })
export class Event {
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
  status: boolean | null;

  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @OneToMany(() => Product, (product) => product.event)
  products: Product[];
}
