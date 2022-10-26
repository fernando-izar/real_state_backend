import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("addresses")
export class Adresses {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 100 })
  district: string;

  @Column({ length: 8 })
  zipCode: string;

  @Column({ length: 10 })
  number: string;

  @Column({ length: 50 })
  city: string;

  @Column({ length: 50 })
  state: string;
}
