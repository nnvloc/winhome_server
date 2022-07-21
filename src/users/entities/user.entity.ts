import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, Unique, AfterLoad, OneToMany } from 'typeorm';
import * as bcrypt from 'bcryptjs';

import { BaseEntity } from '../../entities/base.entity';
import { Room } from 'src/rooms/entities/rooms.entity';
import { Booking } from 'src/bookings/entities/booking.entity';

export const UserRole = {
  ADMIN: "admin",
  USER: "user",
  SUPER_ADMIN: "super_admin",
  ROOM_OWNER: 'room_owner'
}

@Entity()
@Unique(['email'])
@Unique(['loginToken'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
    name: 'first_name'
  })
  firstName: string;

  @Column({
    nullable: true,
    name: 'last_name'
  })
  lastName: string;

  @Column({ name: 'full_name', default: '' })
  fullName: string;

  @Column()
  email: string

  @Column()
  password: string

  @Column({
    nullable: true,
    name: 'login_token'
  })
  loginToken: string;

  @Column({
    default: '',
    name: 'phone_code'
  })
  phoneCode: string;

  @Column({
    default: null,
    name: 'phone_number',
    unique: true,
    nullable: true,
  })
  phoneNumber: string;

  @Column({
    nullable: true,
    default: null,
  })
  dob: Date;

  @Column({ default: true, name: 'is_active' })
  isActive: boolean;

  @Column({
    default: UserRole.USER
  })
  role: string;

  @Column({
    nullable: true,
    name: 'reset_code'
  })
  resetCode: string;

  @OneToMany(() => Room, room => room.owner)
  rooms: Room[];

  @OneToMany(() => Booking, booking => booking.user)
  bookings: Booking[];

  @OneToMany(() => Booking, booking => booking.itemOwner)
  ownerBookings: Booking[];

  @Column({
    nullable: true,
    default: '',
  })
  avatar: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 8);
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  toJSON() {
    const { password, ...user} = this;
    return user;
  }
}

export default User
