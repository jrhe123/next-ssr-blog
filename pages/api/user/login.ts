import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
// config
import { ironOptions } from "config";
import { ISession } from ".";
// db
import { prepareConnection } from "db";
import { User, UserAuth } from "db/entity";

type APIResponse = {
  code: number;
  data?: object;
  message?: string;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<APIResponse>
) => {
  const session: ISession = req.session;
  const { phone = "", verify = "", identity_type = "phone" } = req.body;
  if (String(session.verifyCode) !== verify) {
    return res.status(200).json({
      code: -1,
      message: "Invalid code",
    });
  }
  const db = await prepareConnection();
  const userRepository = db.getRepository(User);
  const userAuthRepository = db.getRepository(UserAuth);
  const users = await userRepository.find();
  // AppDataSource.manager.save()

  console.log("users: ", users);

  return res.status(200).json({
    code: 0,
  });
};

export default withIronSessionApiRoute(handler, ironOptions);
