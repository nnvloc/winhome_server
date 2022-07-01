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

  @Column()
  lastName: string;

  @Column()
  email: string

  @Column()
  password: string

  @Column({
    nullable: true,
  })
  loginToken: string;

  @Column({
    default: '',
  })
  phoneCode: string;

  @Column({
    default: '',
  })
  phoneNumber: string;

  @Column({
    default: new Date(),
  })
  dob: Date;

  @Column({ default: true })
  isActive: boolean;

  @Column({
    default: UserRole.USER
  })
  role: string;

  @Column({
    nullable: true,
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
