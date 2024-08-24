import { Column, Entity, Index, OneToMany } from "typeorm";
import { Invoice } from "./Invoice";
import { OrderDetail } from "./OrderDetail";

@Index("PK__ORDER__46596229EE29C05A", ["orderId"], { unique: true })
@Entity("ORDER", { schema: "dbo" })
export class Order {
  @Column("int", { primary: true, name: "order_id" })
  orderId: number;

  @Column("nvarchar", { name: "address", nullable: true, length: 10 })
  address: string | null;

  @Column("nvarchar", { name: "content", nullable: true, length: 255 })
  content: string | null;

  @Column("datetime", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("datetime", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("nvarchar", { name: "customer_name", nullable: true, length: 255 })
  customerName: string | null;

  @Column("nvarchar", { name: "email", nullable: true, length: 255 })
  email: string | null;

  @Column("nvarchar", { name: "payment", nullable: true, length: 10 })
  payment: string | null;

  @Column("nvarchar", { name: "phone", nullable: true, length: 10 })
  phone: string | null;

  @Column("int", { name: "total", nullable: true })
  total: number | null;

  @Column("bit", { name: "status", nullable: true })
  status: boolean | null;

  @OneToMany(() => Invoice, (invoice) => invoice.order)
  invoices: Invoice[];

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
  orderDetails: OrderDetail[];
}
