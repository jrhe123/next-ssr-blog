import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
// config
import { ironOptions } from "config";
import { ISession } from ".";
// db
import { prepareConnection } from "db";
import { User, Article, Tag } from "db/entity";
// code
import { EXCEPTION_ARTICLE } from "pages/api/config/codes";

type APIResponse = {
  code: number;
  data?: object;
  message?: string;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<APIResponse>
) => {
  if (req.method !== "POST")
    return res.status(405).json({ code: -1, message: "Method Not Allowed" });
  const session: ISession = req.session;
  if (!session.userId)
    return res.status(304).json({ code: -1, message: "Invalid api call" });
  const {
    title,
    content,
    tagIds = [],
  }: {
    title: string;
    content: string;
    tagIds: number[];
  } = req.body;
  // db
  const db = await prepareConnection();
  const userRepository = db.getRepository(User);
  const articleRepository = db.getRepository(Article);
  const tagRepository = db.getRepository(Tag);
  // user
  const userRes = await userRepository.findOne({
    id: session.userId,
  });
  if (!userRes)
    return res.status(304).json({ code: -1, message: "User not found" });
  // tag
  const tagListRes = await tagRepository.find({
    where: tagIds.map((tagId) => ({
      id: tagId,
    })),
  });
  // article
  const article = new Article();
  article.title = title;
  article.content = content;
  article.create_time = new Date();
  article.update_time = new Date();
  article.is_delete = 0;
  article.views = 0;
  article.user = userRes;
  if (tagListRes) {
    const updateTags = tagListRes.map((tag) => {
      tag.article_count += 1;
      return tag;
    });
    article.tags = updateTags;
  }
  const articleRes = await articleRepository.save(article);
  if (!articleRes) {
    return res.status(200).json({
      ...EXCEPTION_ARTICLE.PUBLISH_FAILED,
    });
  }
  // response
  return res.status(200).json({
    code: 0,
    message: "Success",
    data: articleRes,
  });
};

export default withIronSessionApiRoute(handler, ironOptions);
