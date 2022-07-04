import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../entities/base.entity';

@Entity()
@Unique(['name'])
export class Setting extends BaseEntity {
  @ApiProperty({
    type: Number,
    description: "Record id",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    type: String,
    description: "Record name"
  })
  @Column()
  name: string;

  @ApiProperty({
    type: String,
    description: "API base url"
  })
  @Column({ name: 'base_url', nullable: true })
  baseUrl: string;

  @ApiProperty({
    type: String,
    description: "Note"
  })
  @Column({
    nullable: true,
  })
  note: string;

  @ApiProperty({
    type: Boolean,
    description: "Active status"
  })
  @Column({
    default: true,
    name: 'is_active'
  })
  isActive: boolean;

  @ApiProperty({
    type: Number,
    description: "The effect level of this record"
  })
  @Column({
    default: 0,
  })
  level: number;
}
