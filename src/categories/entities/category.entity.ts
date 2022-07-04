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
  @PrimaryGeneratedColumn()
  id: Number;

  @Column()
  name: String;

  @Column({ default: false, name: 'is_default' })
  isDefault: Boolean;

  @Column({ nullable: true, name: 'image_url' })
  imageUrl: String;

  @Column({ default: 1 })
  status: Number;

  @OneToMany(() => Room, room => room.category)
  rooms: Room[];

  toJSON() {
    return this;
  }
}
