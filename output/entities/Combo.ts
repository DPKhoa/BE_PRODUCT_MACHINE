import { Column, Entity, Index, ManyToMany } from 'typeorm';
import { Product } from './Product';

@Index('PK__COMBO__18F74AA33F9B1D58', ['comboId'], { unique: true })
@Index('UQ__COMBO__18F74AA2E48CA591', ['comboId'], { unique: true })
@Entity('COMBO', { schema: 'dbo' })
export class Combo {
  @Column('int', { primary: true, name: 'combo_id' })
  comboId: number;

  @Column('int', { name: 'cost', nullable: true })
  cost: number | null;

  @Column('nvarchar', { name: 'image', nullable: true, length: 255 })
  image: string | null;

  @Column('nvarchar', { name: 'name', nullable: true, length: 255 })
  name: string | null;

  @Column('int', { name: 'price', nullable: true })
  price: number | null;

  @Column('int', { name: 'discount', nullable: true })
  discount: number | null;

  @Column('bit', { name: 'status', nullable: true })
  status: boolean | null;

  @Column('int', { name: 'product_number', nullable: true })
  productNumber: number | null;

  @ManyToMany(() => Product, (product) => product.combos)
  products: Product[];
}
