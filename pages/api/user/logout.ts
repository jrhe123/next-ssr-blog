import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
// config
import { ironOptions } from "config";
import { ISession } from ".";
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
  // unset session & cookies
  await session.destroy();
  setCookie(cookie, {
    userId: "",
    nickname: "",
    avatar: "",
  });
  // response
  return res.status(200).json({
    code: 0,
    message: "logged out",
    data: {},
  });
};

export default withIronSessionApiRoute(handler, ironOptions);
