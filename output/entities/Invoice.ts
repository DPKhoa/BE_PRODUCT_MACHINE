import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Order } from './Order';

@Index('PK__INVOICE__71E86B6BF465F8D1', ['invoiceId', 'orderId'], {
  unique: true,
})
@Index('UQ__INVOICE__F58DFD48C2068EEB', ['invoiceId'], { unique: true })
@Entity('INVOICE', { schema: 'dbo' })
export class Invoice {
  @Column('int', { primary: true, name: 'invoice_id' })
  invoiceId: number;

  @Column('int', { primary: true, name: 'order_id' })
  orderId: number;

  @Column('nvarchar', { name: 'address', nullable: true, length: 255 })
  address: string | null;

  @Column('nvarchar', { name: 'content', nullable: true, length: 255 })
  content: string | null;

  @Column('datetime', { name: 'created_at', nullable: true })
  createdAt: Date | null;

  @Column('datetime', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @Column('nvarchar', { name: 'customer_name', nullable: true, length: 255 })
  customerName: string | null;

  @Column('nvarchar', { name: 'email', nullable: true, length: 255 })
  email: string | null;

  @Column('nvarchar', { name: 'payment', nullable: true, length: 255 })
  payment: string | null;

  @Column('nvarchar', { name: 'phone', nullable: true, length: 255 })
  phone: string | null;

  @Column('int', { name: 'total', nullable: true })
  total: number | null;

  @Column('bit', { name: 'status', nullable: true })
  status: boolean | null;

  @ManyToOne(() => Order, (order) => order.invoices)
  @JoinColumn([{ name: 'order_id', referencedColumnName: 'orderId' }])
  order: Order;
}
