import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Product } from './Product';
import { Order } from './Order';

@Entity('ORDER_DETAIL', { schema: 'dbo' })
export class OrderDetail {
  @Column('int', { primary: true, name: 'product_id' })
  productId: number;

  @Column('int', { primary: true, name: 'order_id' })
  orderId: number;

  @Column('int', { name: 'price', nullable: true })
  price: number | null;

  @ManyToOne(() => Product, (product) => product.orderDetails)
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'productId' }])
  product: Product;

  @ManyToOne(() => Order, (order) => order.orderDetails)
  @JoinColumn([{ name: 'order_id', referencedColumnName: 'orderId' }])
  order: Order;
}
