import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
// config
import { ironOptions } from "config";
import { ISession } from ".";
// db
import { prepareConnection } from "db";
import { User, Article, Tag } from "db/entity";
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
  if (req.method !== "PUT")
    return res.status(405).json({ code: -1, message: "Method Not Allowed" });
  const session: ISession = req.session;
  if (!session.userId)
    return res.status(304).json({ code: -1, message: "Invalid api call" });
  const {
    id,
    title,
    content,
    tagIds = [],
  }: {
    id: number;
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
    return res.status(304).json({
      ...EXCEPTION_USER.NOT_FOUND_USER,
    });
  // tag
  const tagListRes = await tagRepository.find({
    where: tagIds.map((tagId) => ({
      id: tagId,
    })),
  });
  // article
  const articleRes = await articleRepository.findOne({
    where: {
      id,
    },
    relations: ["user", "tags"],
  });
  if (!articleRes || articleRes.user.id !== userRes.id) {
    return res.status(200).json({
      ...EXCEPTION_ARTICLE.UPDATE_FAILED,
    });
  }
  articleRes.title = title;
  articleRes.content = content;
  articleRes.update_time = new Date();
  // increase new tag list, if it's new added
  // note: it's cascade delete, if it;s removed
  // TODO: should update removed tags count in tag
  if (tagListRes) {
    const updateTags = tagListRes.map((tag) => {
      if (articleRes.tags.indexOf(tag) === -1) {
        tag.article_count += 1;
      }
      return tag;
    });
    articleRes.tags = updateTags;
  }
  const updatedArticleRes = await articleRepository.save(articleRes);
  // response
  return res.status(200).json({
    code: 0,
    message: "Updated",
    data: updatedArticleRes,
  });
};

export default withIronSessionApiRoute(handler, ironOptions);
