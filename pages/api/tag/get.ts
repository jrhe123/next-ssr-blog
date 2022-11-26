import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
// config
import { ironOptions } from "config";
import { ISession } from ".";
// db
import { prepareConnection } from "db";
import { Tag, User } from "db/entity";
// code
import { EXCEPTION_USER } from "pages/api/config/codes";

type APIResponse = {
  code: number;
  data?: object;
  message?: string;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<APIResponse>
) => {
  if (req.method !== "GET")
    return res.status(405).json({ code: -1, message: "Method Not Allowed" });
  const session: ISession = req.session;
  if (!session.userId)
    return res.status(304).json({ code: -1, message: "Invalid api call" });
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
  const followTagRes = await tagRepository.find({
    where: (qb: { where: (arg0: string, arg1: { id: number }) => void }) => {
      qb.where("user_id = :id", {
        id: Number(userRes.id),
      });
    },
    relations: ["users"],
  });
  const allTagRes = await tagRepository.find({
    relations: ["users"],
  });
  // response
  return res.status(200).json({
    code: 0,
    message: "Success",
    data: {
      followTags: followTagRes,
      allTags: allTagRes,
    },
  });
};

export default withIronSessionApiRoute(handler, ironOptions);
