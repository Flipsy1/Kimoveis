import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./users.entity";
import { Properties } from "./properties.entity";

@Entity("schedules_users_properties")
export class SchedulesUsersProperties {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "date" })
  date: string;

  @Column({ type: "time" })
  hour: string;

  @ManyToOne(() => Properties, (property) => property.schedules)
  property: Properties;

  @ManyToOne(() => Users, (user) => user.schedules)
  user: Users;
}
