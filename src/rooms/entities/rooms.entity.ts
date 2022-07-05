import { ItemEntity } from '../../entities/item.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { User } from 'src/users/entities/user.entity';
@Entity()
export class Room extends ItemEntity {
  @Column()
  rooms: number;

  @Column()
  address: string;

  @Column()
  status: number

  @Column()
  lat: number;

  @Column()
  lng: number;

  @Column({ name: 'category_id' })
  categoryId: number;

  @JoinColumn({ name: 'category_id' })
  @ManyToOne(() => Category, category => category.rooms)
  category: Category;

  @Column({ name: 'user_id' })
  userId: number;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User, user => user.rooms)
  owner: User;

  toJSON() {
    return this;
  }
}
