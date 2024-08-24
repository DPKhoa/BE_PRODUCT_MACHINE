import { Column, Entity, Index, OneToMany } from 'typeorm';
import { Product } from './Product';

@Index('PK__CATEGORY__D54EE9B4B61A9C8C', ['categoryId'], { unique: true })
@Index('UQ__CATEGORY__D54EE9B5CB93795A', ['categoryId'], { unique: true })
@Entity('CATEGORY', { schema: 'dbo' })
export class Category {
  @Column('int', { primary: true, name: 'category_id' })
  categoryId: number;

  @Column('nvarchar', { name: 'name', nullable: true, length: 255 })
  name: string | null;

  @Column('bit', { name: 'status', nullable: true })
  status: boolean | null;

  @Column('datetime', { name: 'created_at', nullable: true })
  createdAt: Date | null;

  @Column('datetime', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
