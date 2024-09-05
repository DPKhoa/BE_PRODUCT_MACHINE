import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './Product';

@Index('UQ__BRAND__5E5A8E26FE4A37DF', ['brandId'], { unique: true })
@Entity('BRAND', { schema: 'dbo' })
export class Brand {
  @Column('nvarchar', { name: 'name', nullable: true, length: 50 })
  name: string | null;

  @Column('nvarchar', { name: 'image', nullable: true, length: 255 })
  image: string | null;

  @Column('datetime', { name: 'created_at', nullable: true })
  createdAt: Date | null;

  @Column('datetime', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @PrimaryGeneratedColumn({ type: 'int', name: 'brand_id' })
  brandId: number;

  @OneToMany(() => Product, (product) => product.brand)
  products: Product[];
}
