import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./user";

@Entity({ name: "articles" })
export class Article extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @ManyToOne(() => User, {
    cascade: true,
  })
  @JoinColumn({ name: "user_id" })
  user!: User;

  @Column("text", { nullable: true })
  title!: string;

  @Column("text", { nullable: true })
  content!: string;

  @Column("int", { nullable: false })
  views!: number;

  @Column("datetime", { nullable: true })
  create_time!: Date;

  @Column("datetime", { nullable: true })
  update_time!: Date;

  @Column("int", { nullable: false })
  is_delete!: number;
}
