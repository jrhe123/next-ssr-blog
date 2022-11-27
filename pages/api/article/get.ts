import type { NextApiRequest, NextApiResponse } from "next";
// db
import { prepareConnection } from "db";
import { Article, Tag } from "db/entity";
// code
import { EXCEPTION_ARTICLE } from "pages/api/config/codes";

type APIResponse = {
  code: number;
  data?: object;
  message?: string;
};

type User = {
  id: number;
  nickname: string;
  avatar: string;
  job: string;
  introduce: string;
};

export type IArticle = {
  id: number;
  title: string;
  content: string;
  views: number;
  create_time: Date;
  update_time: Date;
  is_delete: number;
  user: User;
  comments?: Comment[];
  tags: ITag[];
};

export type ITag = {
  id: number;
  title: string;
  icon: string;
  follow_count: number;
  article_count: number;
  users: User[];
  articles: Article[];
};

export type Comment = {
  id: number;
  content: string;
  create_time: Date;
  update_time: Date;
  user: User;
  article: Article;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<APIResponse>
) => {
  if (req.method !== "GET")
    return res.status(405).json({ code: -1, message: "Method Not Allowed" });
  const { tagId } = req.query;
  // db
  const db = await prepareConnection();
  const articleRepository = db.getRepository(Article);
  // articles
  let articles = [];
  if (tagId) {
    articles = await articleRepository.find({
      relations: ["user", "tags"],
      where: (qb: { where: (arg0: string, arg1: { id: number }) => void }) => {
        qb.where("tag_id = :id", {
          id: Number(tagId),
        });
      },
    });
  } else {
    articles = await articleRepository.find({
      relations: ["user", "tags"],
    });
  }
  // response
  return res.status(200).json({
    code: 0,
    message: "Success",
    data: articles || [],
  });
};

export default handler;
