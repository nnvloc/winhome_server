import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  OneToMany,
  ManyToOne,
  AfterInsert,
} from 'typeorm';
import { BaseEntity } from '../../entities/base.entity';
import { Room } from '../../rooms/entities/rooms.entity';

@Entity()
@Unique(['name'])
export class Category extends BaseEntity {
  @Column()
  name: string;

  @Column({ default: false, name: 'is_default' })
  isDefault: boolean;

  @Column({ nullable: true, name: 'image_url' })
  imageUrl: string;

  @Column({ default: 1 })
  status: number;

  @OneToMany(() => Room, room => room.category)
  rooms: Room[];

  toJSON() {
    return this;
  }
}
