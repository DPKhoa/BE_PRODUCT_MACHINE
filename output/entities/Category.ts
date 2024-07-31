import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Brand } from './Brand';
// Ensure the path is correct

@Entity('CATEGORY', { schema: 'dbo' })
export class Category {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'id_brand' })
  idBrand: number;

  @Column('nvarchar', { name: 'name', nullable: true, length: 255 })
  name: string | null;

  @Column('bit', { name: 'status', nullable: true })
  status: boolean | null;

  @Column('datetime', { name: 'created_at', nullable: true })
  createdAt: Date | null;

  @Column('datetime', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @ManyToOne(() => Brand, (brand) => brand.categories)
  @JoinColumn({ name: 'id_brand', referencedColumnName: 'id' })
  brand: Brand;
}
