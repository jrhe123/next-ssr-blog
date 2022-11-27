import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { User } from "./user";
import { Comment } from "./comment";
import { Tag } from "./tag";

@Entity({ name: "articles" })
export class Article extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @ManyToOne(() => User, {
    cascade: true,
  })
  @JoinColumn({ name: "user_id" })
  user!: User;

  @OneToMany(() => Comment, (comment) => comment.article)
  comments!: Comment[];

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

  @ManyToMany(() => Tag, (tag) => tag.articles, {
    cascade: true,
  })
  tags!: Tag[];
}
