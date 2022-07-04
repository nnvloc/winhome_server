import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, Unique, AfterLoad } from 'typeorm';
import * as bcrypt from 'bcryptjs';

import { BaseEntity } from '../../entities/base.entity';

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

  @Column()
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

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
    default: '',
    name: 'phone_number'
  })
  phoneNumber: string;

  @Column({
    default: new Date(),
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
