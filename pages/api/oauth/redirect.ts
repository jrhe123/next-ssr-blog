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
// lib
import makeApi from "libs/core/configureAxios";

type APIResponse = {
  code: number;
  data?: object;
  message?: string;
};
type OauthResponse = {
  access_token: string;
};
type OauthUserResponse = {
  login: string;
  id: string;
  node_id: string;
  avatar_url: "";
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<APIResponse>
) => {
  const session: ISession = req.session;
  const cookie = Cookie.fromApiRoute(req, res);
  const { code } = req.query;
  if (!code)
    return res.status(405).json({ code: -1, message: "Method Not Allowed" });
  //
  const githubClientID = process.env.GITHUB_CLIENT_ID as string;
  const githubClientSecret = process.env.GITHUB_CLIENT_SECRET as string;
  const githubUrl =
    `/login/oauth/access_token?` +
    `client_id=${githubClientID}&` +
    `client_secret=${githubClientSecret}&` +
    `code=${code}`;
  const api = makeApi("https://github.com");
  const oauthRes: OauthResponse = await api.post(
    githubUrl,
    {},
    {
      headers: {
        accept: "application/json",
      },
    }
  );
  const { access_token } = oauthRes;
  // get user info
  const githubUserRes: OauthUserResponse = await api.get(
    "https://api.github.com/user",
    {
      headers: {
        accept: "application/json",
        Authorization: `token ${access_token}`,
      },
    }
  );
  // db
  const db = await prepareConnection();
  const userAuthRepository = db.getRepository(UserAuth);
  let userAuth = await userAuthRepository.findOne(
    {
      identity_type: "github",
      identifier: githubUserRes.node_id,
    },
    {
      relations: ["user"],
    }
  );
  // if user auth not exists, register now
  if (!userAuth) {
    // user
    const user = new User();
    user.nickname = githubUserRes.login;
    user.avatar = githubUserRes.avatar_url;
    user.job = "github developer";
    user.introduce = "";
    // userAuth
    userAuth = new UserAuth();
    userAuth.identity_type = "github";
    userAuth.identifier = githubUserRes.node_id;
    userAuth.credential = access_token;
    userAuth.user = user;
    await userAuthRepository.save(userAuth);
  } else {
    await userAuthRepository.update(userAuth.id, {
      credential: access_token,
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
  // redirect to home page
  return res.redirect(process.env.GITHUB_REDIRECT_URI as string);
};

export default withIronSessionApiRoute(handler, ironOptions);
