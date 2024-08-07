import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './Category';

@Entity('PRODUCT', { schema: 'dbo' })
export class Product {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('nvarchar', { name: 'name', nullable: true, length: 255 })
  name: string | null;

  @Column('nvarchar', { name: 'descrption', nullable: true, length: 255 })
  descrption: string | null;

  @Column('decimal', { name: 'price', nullable: true, precision: 10, scale: 2 })
  price: number | null;

  @Column('int', { name: 'quantity', nullable: true })
  quantity: number | null;

  @Column('bit', { name: 'status', nullable: true })
  status: boolean | null;

  @Column('decimal', { name: 'cost', nullable: true, precision: 10, scale: 2 })
  cost: number | null;

  @Column('datetime', { name: 'created_at', nullable: true })
  createdAt: Date | null;

  @Column('datetime', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @Column('nvarchar', { name: 'event', nullable: true, length: 255 })
  event: string | null;

  @Column('nvarchar', { name: 'discount', nullable: true, length: 10 })
  discount: string | null;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn([{ name: 'id_category', referencedColumnName: 'id' }])
  category: Category;
}
