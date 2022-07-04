import { BaseEntity } from '../../entities/base.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Room } from './rooms.entity';
@Entity()
export class RoomAssets extends BaseEntity {
  @Column({ name: 'room_id' })
  roomId: number;

  @JoinColumn({ name: 'room_id' })
  @ManyToOne(() => Room, room => room.id)
  room: Room;

  @Column()
  url: string;

  @Column()
  type: number;

  @Column({ name: 'file_name' })
  fileName: string;

  @Column({ name: 'file_size' })
  fileSize: number;

  @Column({ name: 'file_extendsion' })
  fileExtendsion: string;

  @Column()
  status: number;

  toJSON() {
    return this;
  }
}
