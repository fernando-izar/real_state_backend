import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";

import { User } from "./user.entity";
import { Properties } from "./properties.entity";

@Entity("schedules_users_properties")
export class Schedules {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "date" })
  date: Date;

  @Column({ type: "time" })
  hour: Date;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Properties)
  property: Properties;
}
