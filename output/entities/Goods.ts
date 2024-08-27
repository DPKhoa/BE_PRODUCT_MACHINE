import { Column, Entity, Index, OneToMany } from 'typeorm';
import { GoodsDetail } from './GoodsDetail';

@Index('UQ__GOODS__40BA22381030D97C', ['goodsId'], { unique: true })
@Entity('GOODS', { schema: 'dbo' })
export class Goods {
  @Column('int', { primary: true, name: 'goods_id' })
  goodsId: number;

  @Column('int', { name: 'cost', nullable: true })
  cost: number | null;

  @Column('datetime', { name: 'created_at', nullable: true })
  createdAt: Date | null;

  @Column('datetime', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @Column('int', { name: 'quantity', nullable: true })
  quantity: number | null;

  @OneToMany(() => GoodsDetail, (goodsDetail) => goodsDetail.goods)
  goodsDetails: GoodsDetail[];
}
