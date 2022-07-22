import { Entity, Column, ManyToOne, JoinColumn, OneToMany, Timestamp, OneToOne } from 'typeorm';

import { INVOICE_STATUS } from 'src/config';

import { User } from 'src/users/entities/user.entity';
import { BaseEntity } from 'src/entities/base.entity';
import { Room } from 'src/rooms/entities/rooms.entity';
import { Booking } from 'src/bookings/entities/booking.entity';

@Entity('invoices')
export class Invoice extends BaseEntity {
  @Column({
    name: 'user_id',
    nullable: false,
  })
  userId: number;

  @Column({
    name: 'item_id',
    nullable: false,
  })
  itemId: number;

  @Column({
    name: 'item_owner_id',
    nullable: false,
  })
  itemOwnerId: number;

  @Column({
    name: 'booking_id',
    nullable: false,
  })
  bookingId: number;

  @Column({
    name: 'item_price',
    nullable: false,
  })
  itemPrice: number;

  @Column({
    name: 'total_amount',
    nullable: false,
  })
  totalAmount: number;

  @Column({
    name: 'amount',
    nullable: false,
  })
  amount: number;

  @Column({
    name: 'service_fee',
    nullable: false,
    default: 0,
  })
  serviceFee: number;

  @Column({
    name: 'tax',
    nullable: false,
    default: 0,
  })
  tax: number;

  @Column({
    default: INVOICE_STATUS.ACTIVE,
  })
  status: number;

  @Column({
    nullable: true,
    default: '',
  })
  note: string;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User, user => user.bookings)
  user: User;

  @JoinColumn({ name: 'item_owner_id' })
  @ManyToOne(() => User, user => user.ownerBookings)
  itemOwner: User;

  @JoinColumn({ name: 'item_id' })
  @ManyToOne(() => Room, room => room.bookings)
  item: Room;

  @JoinColumn({ name: 'booking_id' })
  @OneToOne(() => Booking, booking => booking.invoice)
  booking: Booking;
}
