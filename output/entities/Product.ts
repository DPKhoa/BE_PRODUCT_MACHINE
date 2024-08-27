import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Combo } from './Combo';
import { Event } from './Event';
import { GoodsDetail } from './GoodsDetail';
import { ImgProduct } from './ImgProduct';
import { OrderDetail } from './OrderDetail';
import { Brand } from './Brand';
import { Category } from './Category';

@Index('UQ__PRODUCT__47027DF48D96652A', ['productId'], { unique: true })
@Entity('PRODUCT', { schema: 'dbo' })
export class Product {
  @Column('int', { primary: true, name: 'product_id' })
  productId: number;

  @Column('nvarchar', { name: 'name', nullable: true, length: 255 })
  name: string | null;

  @Column('nvarchar', { name: 'descrption', nullable: true, length: 255 })
  descrption: string | null;

  @Column('decimal', { name: 'price', nullable: true, precision: 10, scale: 2 })
  price: number | null;

  @Column('int', { name: 'quantity', nullable: true })
  quantity: number | null;

  @Column('bit', { name: 'status', nullable: true })
  status: boolean | null;

  @Column('decimal', { name: 'cost', nullable: true, precision: 10, scale: 2 })
  cost: number | null;

  @Column('datetime', { name: 'created_at', nullable: true })
  createdAt: Date | null;

  @Column('datetime', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @Column('nvarchar', { name: 'guarantee', nullable: true, length: 10 })
  guarantee: string | null;

  @ManyToMany(() => Combo, (combo) => combo.products)
  @JoinTable({
    name: 'COMBO_DETAIL',
    joinColumns: [{ name: 'product', referencedColumnName: 'productId' }],
    inverseJoinColumns: [{ name: 'combo', referencedColumnName: 'comboId' }],
    schema: 'dbo',
  })
  combos: Combo[];

  @ManyToMany(() => Event, (event) => event.products)
  @JoinTable({
    name: 'EVENT_DETAIL',
    joinColumns: [{ name: 'product_id', referencedColumnName: 'productId' }],
    inverseJoinColumns: [{ name: 'event_id', referencedColumnName: 'eventId' }],
    schema: 'dbo',
  })
  events: Event[];

  @OneToMany(() => GoodsDetail, (goodsDetail) => goodsDetail.product)
  goodsDetails: GoodsDetail[];

  @OneToMany(() => ImgProduct, (imgProduct) => imgProduct.product)
  imgProducts: ImgProduct[];

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.product)
  orderDetails: OrderDetail[];

  @ManyToOne(() => Brand, (brand) => brand.products)
  @JoinColumn([{ name: 'brand_id', referencedColumnName: 'brandId' }])
  brand: Brand;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn([{ name: 'category', referencedColumnName: 'categoryId' }])
  category: Category;
}
