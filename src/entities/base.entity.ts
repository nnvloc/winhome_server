import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  Timestamp,
} from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Timestamp;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Timestamp;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Timestamp;
}
