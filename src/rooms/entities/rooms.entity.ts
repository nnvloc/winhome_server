import { ItemEntity } from '../../entities/item.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, Timestamp, } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { User } from 'src/users/entities/user.entity';

import { ROOM_STATUS } from 'src/config';
import { RoomAssets } from './room_assets.entity';
import { Booking } from 'src/bookings/entities/booking.entity';
import { Invoice } from 'src/invoices/entities/invoice.entity';
@Entity()
export class Room extends ItemEntity {
  @Column()
  rooms: number;

  @Column()
  address: string;

  @Column({
    default: ROOM_STATUS.WAITING_FOR_APPROVED,
  })
  status: number

  @Column({
    nullable: true
  })
  lat?: number;

  @Column({
    nullable: true
  })
  lng?: number;

  @Column({
    name: 'category_id',
    default: 1,
  })
  categoryId: number;

  @Column({ name: 'building', nullable: true, default: '' })
  building: string;

  @Column({ name: 'unit_no', nullable: true, default: '' })
  unitNo: string;

  @Column({
    name: 'floor',
    nullable: true,
    default: null,
  })
  floor: string;

  @Column({
    nullable: true,
    default: null,
  })
  description: string;

  @Column({
    name: 'priority_at',
    nullable: true,
    default: null,
  })
  priorityAt?: Date;

  @JoinColumn({ name: 'category_id' })
  @ManyToOne(() => Category, category => category.rooms)
  category: Category;

  @Column({ name: 'user_id' })
  userId: number;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User, user => user.rooms)
  owner: User;

  @OneToMany(() => RoomAssets, asset => asset.room)
  assets: RoomAssets[];

  @OneToMany(() => Booking, booking => booking.item)
  bookings: RoomAssets[];

  @OneToMany(() => Invoice, invoice => invoice.item)
  invoices: Invoice[];
}
