import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sysdiagrams', { schema: 'dbo' })
export class Sysdiagrams {
  @Column('nvarchar', { name: 'name', unique: true, length: 128 })
  name: string;

  @Column('int', { name: 'principal_id', unique: true })
  principalId: number;

  @PrimaryGeneratedColumn({ type: 'int', name: 'diagram_id' })
  diagramId: number;

  @Column('int', { name: 'version', nullable: true })
  version: number | null;

  @Column('varbinary', { name: 'definition', nullable: true })
  definition: Buffer | null;
}
