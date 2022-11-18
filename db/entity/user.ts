import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
// import { UserAuth } from "./userAuth";

@Entity({ name: "users" })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column("text", { nullable: true })
  nickname!: string;

  @Column("text", { nullable: true })
  avatar!: string;

  @Column("text", { nullable: true })
  job!: string;

  @Column("text", { nullable: true })
  introduce!: string;

  // @OneToMany(() => UserAuth, (auth) => auth.user, {
  //   createForeignKeyConstraints: false,
  // })
  // auths!: UserAuth[];
}
