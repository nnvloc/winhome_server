import { Entity, Column, ManyToOne, JoinColumn, OneToMany, Timestamp, OneToOne } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { BaseEntity } from 'src/entities/base.entity';
import { BOOKING_STATUS } from 'src/config';
import { Room } from 'src/rooms/entities/rooms.entity';
import { Invoice } from 'src/invoices/entities/invoice.entity';

@Entity('bookings')
export class Booking extends BaseEntity {
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
    name: 'start_date',
    nullable: false,
    type: 'timestamptz',
  })
  startDate: Date;

  @Column({
    name: 'end_date',
    nullable: false,
    type: 'timestamptz',
  })
  endDate: Date;

  @Column({
    name: 'number_of_guests',
    nullable: true,
  })
  numberOfGuests: number;

  @Column({
    default: BOOKING_STATUS.WAITING_FOR_APPROVED,
  })
  status: number;

  @Column({
    nullable: true,
    default: '',
  })
  note: string;

  @Column({
    nullable: true,
    default: null,
  })
  description: string;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User, user => user.bookings)
  user: User;

  @JoinColumn({ name: 'item_owner_id' })
  @ManyToOne(() => User, user => user.ownerBookings)
  itemOwner: User;

  @JoinColumn({ name: 'item_id' })
  @ManyToOne(() => Room, room => room.bookings)
  item: Room;

  @OneToOne(() => Invoice, invoice => invoice.booking)
  invoice: Invoice
}
