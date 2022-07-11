import { BaseEntity } from './base.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Transform } from 'class-transformer';

export class ItemEntity extends BaseEntity {
  @Column()
  price: number;

  @Column({
    default: 'VND'
  })
  currency: string;

  @Column({
    nullable: true
  })
  note: string;
}
