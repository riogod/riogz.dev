import {
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  DeleteDateColumn, Column,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { EntityHelper } from 'src/utils/entity-helper';

@Entity()
export class Session extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, {
    eager: true,
  })
  @Index()
  user: User;

  @Column()
  deviceId: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
