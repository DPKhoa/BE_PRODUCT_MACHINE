import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Order } from "./Order";
import { Product } from "./Product";

@Index("PK__ORDER_DE__C367EBD7E93DAC56", ["productId", "orderId"], {
  unique: true,
})
@Entity("ORDER_DETAIL", { schema: "dbo" })
export class OrderDetail {
  @Column("int", { primary: true, name: "product_id" })
  productId: number;

  @Column("int", { primary: true, name: "order_id" })
  orderId: number;

  @Column("int", { name: "price", nullable: true })
  price: number | null;

  @ManyToOne(() => Order, (order) => order.orderDetails)
  @JoinColumn([{ name: "order_id", referencedColumnName: "orderId" }])
  order: Order;

  @ManyToOne(() => Product, (product) => product.orderDetails)
  @JoinColumn([{ name: "product_id", referencedColumnName: "productId" }])
  product: Product;
}
