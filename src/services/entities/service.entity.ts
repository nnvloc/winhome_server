import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, Unique, AfterLoad, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../entities/base.entity';
import { Category } from '../../categories/entities/category.entity';

@Entity()
@Unique(['name'])
export class Service extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column({
    default: 'SGD'
  })
  currency: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => Category, category => category.services)
  category: string

  toJSON() {
    return this;
  }
}
