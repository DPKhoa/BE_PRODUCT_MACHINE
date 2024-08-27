import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Product } from './Product';

@Index('UQ__IMG_PROD__3213E83E947971A2', ['id'], { unique: true })
@Entity('IMG_PRODUCT', { schema: 'dbo' })
export class ImgProduct {
  @Column('int', { primary: true, name: 'id' })
  id: number;

  @Column('nvarchar', { name: 'img', nullable: true, length: 255 })
  img: string | null;

  @ManyToOne(() => Product, (product) => product.imgProducts)
  @JoinColumn([{ name: 'product', referencedColumnName: 'productId' }])
  product: Product;
}
