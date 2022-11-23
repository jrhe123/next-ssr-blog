import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Article } from "./article";
import { User } from "./user";

@Entity({ name: "comments" })
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @ManyToOne(() => Article, {
    cascade: true,
  })
  @JoinColumn({ name: "article_id" })
  article!: Article;

  @ManyToOne(() => User, {
    cascade: true,
  })
  @JoinColumn({ name: "user_id" })
  user!: User;

  @Column("text", { nullable: true })
  content!: string;

  @Column("datetime", { nullable: true })
  create_time!: Date;

  @Column("datetime", { nullable: true })
  update_time!: Date;
}
