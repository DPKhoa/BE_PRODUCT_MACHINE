import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './Product';
import { Combo } from './Combo';

@Entity('COMBO_DETAIL', { schema: 'dbo' })
export class ComboDetail {
  @Column('int', { primary: true, name: 'product' })
  product: number;

  @Column('int', { primary: true, name: 'combo' })
  combo: number;

  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'product_number', nullable: true })
  productNumber: number | null;

  @ManyToOne(() => Product, (product) => product.comboDetails)
  @JoinColumn([{ name: 'product', referencedColumnName: 'id' }])
  product2: Product;

  @ManyToOne(() => Combo, (combo) => combo.comboDetails)
  @JoinColumn([{ name: 'combo', referencedColumnName: 'id' }])
  combo2: Combo;
}
