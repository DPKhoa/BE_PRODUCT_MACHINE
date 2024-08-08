import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './Product';

@Entity('IMG_PRODUCT', { schema: 'dbo' })
export class ImgProduct {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('nvarchar', { name: 'img', nullable: true, length: 255 })
  img: string | null;

  @ManyToOne(() => Product, (product) => product.imgProducts)
  @JoinColumn([{ name: 'product', referencedColumnName: 'id' }])
  product: Product;
}
