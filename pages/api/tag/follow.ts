import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
// config
import { ironOptions } from "config";
import { ISession } from ".";
// db
import { prepareConnection } from "db";
import { Tag, User } from "db/entity";
// code
import { EXCEPTION_TAG, EXCEPTION_USER } from "pages/api/config/codes";

type APIResponse = {
  code: number;
  data?: object;
  message?: string;
};

enum FollowType {
  FOLLOW = "FOLLOW",
  UN_FOLLOW = "UN_FOLLOW",
}

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
    type,
    tagId,
  }: {
    type: FollowType;
    tagId: number;
  } = req.body;
  // db
  const db = await prepareConnection();
  const userRepository = db.getRepository(User);
  const tagRepository = db.getRepository(Tag);
  // user
  const userRes = await userRepository.findOne({
    id: session.userId,
  });
  if (!userRes) {
    return res.status(304).json({
      ...EXCEPTION_USER.NOT_FOUND_USER,
    });
  }
  // tag
  const tagRes = await tagRepository.findOne({
    where: {
      id: tagId,
    },
    relations: ["users"],
  });
  if (!tagRes) {
    return res.status(304).json({
      ...EXCEPTION_TAG.NOT_FOUND_TAG,
    });
  }
  //
  if (tagRes.users) {
    if (
      type === FollowType.FOLLOW &&
      !tagRes.users.find((user) => user.id === userRes.id)
    ) {
      tagRes.users = tagRes.users.concat(userRes);
      tagRes.follow_count += 1;
    } else if (
      type === FollowType.UN_FOLLOW &&
      tagRes.users.find((user) => user.id === userRes.id)
    ) {
      tagRes.users = tagRes.users.filter((user) => user.id !== userRes.id);
      tagRes.follow_count -= 1;
      if (tagRes.follow_count < 0) tagRes.follow_count = 0;
    }
  }
  // update tag
  await tagRepository.save(tagRes);
  // response
  return res.status(200).json({
    code: 0,
    message: "Success",
    data: {},
  });
};

export default withIronSessionApiRoute(handler, ironOptions);
