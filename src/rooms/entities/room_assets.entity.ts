import { BaseEntity } from '../../entities/base.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Room } from './rooms.entity';
import { ROOM_ASSETS_STATUS, ROOM_ASSETS_TYPE } from 'src/config';
@Entity()
export class RoomAssets extends BaseEntity {
  @Column({ name: 'room_id' })
  roomId: number;

  @JoinColumn({ name: 'room_id' })
  @ManyToOne(() => Room, room => room.assets)
  room: Room;

  @Column()
  url: string;

  @Column({ default: ROOM_ASSETS_TYPE.IMAGE })
  type: number;

  @Column({ name: 'file_name' })
  fileName: string;

  @Column({ name: 'file_size' })
  fileSize: number;

  @Column({ name: 'file_extendsion' })
  fileExtendsion: string;

  @Column({ default: ROOM_ASSETS_STATUS.ACTIVE})
  status: number;

  toJSON() {
    return this;
  }
}
