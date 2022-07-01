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
import { Service } from '../../services/entities/service.entity';

@Entity()
@Unique(['name'])
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: Number;

  @Column()
  name: String;

  @Column({ nullable: true })
  parentCategoryId: Number;

  @ManyToOne(() => Category, category => category.subCategories, {nullable: true})
  parentCategory: Category;

  @OneToMany(() => Category, category => category.parentCategory)
  subCategories: Category[];

  @Column({ default: false })
  isDefault: Boolean;

  @Column({ nullable: true })
  imageUrl: String;

  @Column({ default: 1 })
  status: Number;

  @OneToMany(() => Service, service => service.category)
  services: Service[];

  toJSON() {
    return this;
  }
}
