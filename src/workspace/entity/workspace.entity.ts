import { Channel } from 'src/channel/entity/channel.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Workspace {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    unique: true,
    nullable: true,
  })
  code: string;

  @Column({
    nullable: true,
  })
  logoUrl: string;

  @OneToMany(() => Channel, (channel) => channel.workspace, {
    cascade: true,
  })
  channels: Channel[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
