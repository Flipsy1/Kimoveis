import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("addresses")
export class Addresses {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 120 })
  district: string;

  @Column({ length: 120 })
  zipCode: string;

  @Column({ length: 30 })
  number: string;

  @Column({ length: 60 })
  city: string;

  @Column({ length: 60 })
  state: string;
}
