import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './Product';

@Entity('BRAND', { schema: 'dbo' })
export class Brand {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number;

  @Column('nvarchar', { name: 'name', nullable: true, length: 255 })
  name: string | null;

  @Column('nvarchar', { name: 'image', nullable: true, length: 255 })
  image: string | null;

  @OneToMany(() => Product, (product) => product.idBrand2)
  products: Product[];
}
