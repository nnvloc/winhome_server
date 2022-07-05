import { BaseEntity } from './base.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export class ItemEntity extends BaseEntity {
  @Column()
  price: number;

  @Column({
    default: 'VND'
  })
  currency: string;

  @Column()
  note: string;
}
