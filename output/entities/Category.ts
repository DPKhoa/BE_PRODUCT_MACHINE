import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './Product';

@Entity('CATEGORY', { schema: 'dbo' })
export class Category {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number;

  @Column('nvarchar', { name: 'name', nullable: true, length: 255 })
  name: string | null;

  @Column('nvarchar', { name: 'image', nullable: true, length: 255 })
  image: string | null;

  @Column('bit', { name: 'status', nullable: true })
  status: boolean | null;

  @OneToMany(() => Product, (product) => product.idCategory2)
  products: Product[];
}
