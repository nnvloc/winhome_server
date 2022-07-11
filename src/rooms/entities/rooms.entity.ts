import { ItemEntity } from '../../entities/item.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { User } from 'src/users/entities/user.entity';

import { ROOM_STATUS } from 'src/config';
import { RoomAssets } from './room_assets.entity';
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
  lat: number;

  @Column({
    nullable: true
  })
  lng: number;

  @Column({
    name: 'category_id',
    default: 1,
  })
  categoryId: number;

  @JoinColumn({ name: 'category_id' })
  @ManyToOne(() => Category, category => category.rooms)
  category: Category;

  @Column({ name: 'user_id' })
  userId: number;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User, user => user.rooms)
  owner: User;

  @OneToMany(() => RoomAssets, asset => asset.roomId)
  assets: RoomAssets[];

  toJSON() {
    return this;
  }
}
