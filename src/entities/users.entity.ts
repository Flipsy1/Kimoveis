import { hashSync } from "bcryptjs";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { SchedulesUsersProperties } from "./schedules_users_properties.entity";

@Entity("users")
export class Users {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 50, unique: true })
  email: string;

  @Column({ length: 120 })
  password: string;

  @Column()
  isAdm: boolean;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(
    () => SchedulesUsersProperties,
    (schedulesUsersProperties) => schedulesUsersProperties.user
  )
  schedules: SchedulesUsersProperties;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    this.password = hashSync(this.password, 10);
  }
}
