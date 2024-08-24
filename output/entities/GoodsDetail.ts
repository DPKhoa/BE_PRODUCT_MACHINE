import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Product } from './Product';
import { Goods } from './Goods';

@Index('PK__GOODS_DE__C309DFD63B066A8D', ['productId', 'goodsId'], {
  unique: true,
})
@Entity('GOODS_DETAIL', { schema: 'dbo' })
export class GoodsDetail {
  @Column('int', { primary: true, name: 'product_id' })
  productId: number;

  @Column('int', { primary: true, name: 'goods_id' })
  goodsId: number;

  @Column('int', { name: 'cost', nullable: true })
  cost: number | null;

  @ManyToOne(() => Product, (product) => product.goodsDetails)
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'productId' }])
  product: Product;

  @ManyToOne(() => Goods, (goods) => goods.goodsDetails)
  @JoinColumn([{ name: 'goods_id', referencedColumnName: 'goodsId' }])
  goods: Goods;
}
