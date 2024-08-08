import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ComboDetail } from './ComboDetail';

@Index('UQ__COMBO__3213E83E2B05189F', ['id'], { unique: true })
@Entity('COMBO', { schema: 'dbo' })
export class Combo {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'cost', nullable: true })
  cost: number | null;

  @Column('nvarchar', { name: 'image', nullable: true, length: 255 })
  image: string | null;

  @Column('nvarchar', { name: 'name', nullable: true, length: 255 })
  name: string | null;

  @Column('int', { name: 'price', nullable: true })
  price: number | null;

  @Column('int', { name: 'discount', nullable: true })
  discount: number | null;

  @Column('bit', { name: 'status', nullable: true })
  status: boolean | null;

  @OneToMany(() => ComboDetail, (comboDetail) => comboDetail.combo2)
  comboDetails: ComboDetail[];
}
