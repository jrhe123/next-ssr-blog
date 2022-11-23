import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
// config
import { ironOptions } from "config";
import { ISession } from ".";
// db
import { prepareConnection } from "db";
import { User, Article, Comment } from "db/entity";
// code
import { EXCEPTION_ARTICLE, EXCEPTION_USER } from "pages/api/config/codes";

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
  const { articleId, content } = req.body;
  // db
  const db = await prepareConnection();
  const userRepository = db.getRepository(User);
  const articleRepository = db.getRepository(Article);
  const commentRepository = db.getRepository(Comment);
  // user
  const userRes = await userRepository.findOne({
    id: session.userId,
  });
  if (!userRes) {
    return res.status(304).json({
      ...EXCEPTION_USER.NOT_FOUND_USER,
    });
  }
  // article
  const articleRes = await articleRepository.findOne({
    where: {
      id: articleId,
    },
  });
  if (!articleRes) {
    return res.status(304).json({
      ...EXCEPTION_ARTICLE.NOT_FOUND_ARTICLE,
    });
  }
  // comment
  const comment = new Comment();
  comment.article = articleRes;
  comment.user = userRes;
  comment.content = content;
  comment.create_time = new Date();
  comment.update_time = new Date();
  const commentRes = await commentRepository.save(comment);
  // response
  return res.status(200).json({
    code: 0,
    message: "Success",
    data: commentRes,
  });
};

export default withIronSessionApiRoute(handler, ironOptions);
