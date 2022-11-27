import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
// config
import { ironOptions } from "config";
import { ISession } from ".";
// db
import { prepareConnection } from "db";
import { User } from "db/entity";

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
  //
  const db = await prepareConnection();
  const userRepository = db.getRepository(User);
  // user
  const userRes = await userRepository.findOne({
    id: session.userId,
  });
  if (!userRes)
    return res.status(304).json({ code: -1, message: "User not found" });

  res.status(200).json({
    code: 0,
    message: "",
    data: userRes,
  });
};

export default withIronSessionApiRoute(handler, ironOptions);
