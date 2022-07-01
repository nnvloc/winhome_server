import { BaseEntity } from './base.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ItemEntity extends BaseEntity {
  price: number;
}
