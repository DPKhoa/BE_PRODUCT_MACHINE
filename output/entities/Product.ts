import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Brand } from './Brand';
import { Category } from './Category';

@Entity('PRODUCT', { schema: 'dbo' })
export class Product {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number;

  @Column('int', { primary: true, name: 'id_brand' })
  idBrand: number;

  @Column('nvarchar', { name: 'name', nullable: true, length: 255 })
  name: string | null;

  @Column('nvarchar', { name: 'description', nullable: true, length: 255 })
  description: string | null;

  @Column('int', { name: 'price', nullable: true })
  price: number | null;

  @Column('int', { name: 'quantity', nullable: true })
  quantity: number | null;

  @Column('bit', { name: 'status', nullable: true })
  status: boolean | null;

  @Column('int', { name: 'cost', nullable: true })
  cost: number | null;

  @Column('int', { primary: true, name: 'id_category' })
  idCategory: number;

  @ManyToOne(() => Brand, (brand) => brand.products)
  @JoinColumn([{ name: 'id_brand', referencedColumnName: 'id' }])
  idBrand2: Brand;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn([{ name: 'id_category', referencedColumnName: 'id' }])
  idCategory2: Category;
}
