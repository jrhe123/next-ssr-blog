import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
// config
import { ironOptions } from "config";
import { ISession } from ".";
// db
import { prepareConnection } from "db";
import { User, UserAuth } from "db/entity";
// cookie
import { Cookie } from "next-cookie";
import { setCookie } from "utils";

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
  const cookie = Cookie.fromApiRoute(req, res);
  const { phone = "", verify = "", identity_type = "phone" } = req.body;
  if (String(session.verifyCode) !== verify) {
    return res.status(200).json({
      code: -1,
      message: "Invalid code",
    });
  }
  const db = await prepareConnection();
  const userAuthRepository = db.getRepository(UserAuth);
  let userAuth = await userAuthRepository.findOne(
    {
      identity_type,
      identifier: phone,
    },
    {
      relations: ["user"],
    }
  );
  // if user auth not exists, register now
  if (!userAuth) {
    // user
    const user = new User();
    user.nickname = `User_${Math.floor(Math.random() * 10000)}`;
    // public folder
    // user.avatar = "/images/avatar.jpeg";
    user.avatar = "https://loremflickr.com/240/240";
    user.job = "developer";
    user.introduce = "";
    // userAuth
    userAuth = new UserAuth();
    userAuth.identity_type = identity_type;
    userAuth.identifier = phone;
    userAuth.credential = session.verifyCode;
    userAuth.user = user;
    await userAuthRepository.save(userAuth);
  } else {
    await userAuthRepository.update(userAuth.id, {
      credential: session.verifyCode,
    });
  }
  // save user info into session
  const userRes = userAuth.user;
  const { id, nickname, avatar } = userRes;
  session.userId = id;
  session.nickname = nickname;
  session.avatar = avatar;
  await session.save();
  // save user info into cookie
  setCookie(cookie, {
    userId: id,
    nickname,
    avatar,
  });
  // response
  return res.status(200).json({
    code: 0,
    message: "logged in",
    data: {
      userId: id,
      nickname,
      avatar,
    },
  });
};

export default withIronSessionApiRoute(handler, ironOptions);
