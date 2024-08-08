import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ComboDetail } from './ComboDetail';
import { ImgProduct } from './ImgProduct';
import { Event } from './Event';
import { Category } from './Category';

@Index('PK__PRODUCT__3213E83F36F1B88B', ['id'], { unique: true })
@Index('UQ__PRODUCT__3213E83E02537C78', ['id'], { unique: true })
@Entity('PRODUCT', { schema: 'dbo' })
export class Product {
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

  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @OneToMany(() => ComboDetail, (comboDetail) => comboDetail.product2)
  comboDetails: ComboDetail[];

  @OneToMany(() => ImgProduct, (imgProduct) => imgProduct.product)
  imgProducts: ImgProduct[];

  @ManyToOne(() => Event, (event) => event.products)
  @JoinColumn([{ name: 'event', referencedColumnName: 'id' }])
  event: Event;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn([{ name: 'category', referencedColumnName: 'id' }])
  category: Category;
}
