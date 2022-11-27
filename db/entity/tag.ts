import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Article } from "./article";
import { User } from "./user";

@Entity({ name: "tags" })
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @ManyToMany(() => User, {
    cascade: true,
  })
  @JoinTable({
    name: "tags_users_rel",
    joinColumn: {
      name: "tag_id",
    },
    inverseJoinColumn: {
      name: "user_id",
    },
  })
  users!: User[];

  @ManyToMany(() => Article, (article) => article.tags)
  @JoinTable({
    name: "articles_tags_rel",
    joinColumn: {
      name: "tag_id",
    },
    inverseJoinColumn: {
      name: "article_id",
    },
  })
  articles!: Article[];

  @Column("text", { nullable: true })
  title!: string;

  @Column("text", { nullable: true })
  icon!: string;

  @Column("int", { nullable: true })
  follow_count!: number;

  @Column("int", { nullable: true })
  article_count!: number;
}
