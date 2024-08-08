import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Brand } from './Brand';
import { Product } from './Product';

@Entity('CATEGORY', { schema: 'dbo' })
export class Category {
  @Column('nvarchar', { name: 'name', nullable: true, length: 255 })
  name: string | null;

  @Column('bit', { name: 'status', nullable: true })
  status: boolean | null;

  @Column('datetime', { name: 'created_at', nullable: true })
  createdAt: Date | null;

  @Column('datetime', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ManyToOne(() => Brand, (brand) => brand.categories)
  @JoinColumn([{ name: 'brand', referencedColumnName: 'id' }])
  brand: Brand;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
