import { ItemEntity } from '../../entities/item.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Room extends ItemEntity {
  @Column()
  rooms: number;

  @Column()
  address: string;

  @Column()
  status: number
}
