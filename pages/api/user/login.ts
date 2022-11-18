import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
// config
import { ironOptions } from "config";
import { ISession } from ".";

type APIResponse = {
  code: number;
  data?: object;
  message?: string;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<APIResponse>
) => {
  const { phone = "", verify = "" } = req.body;

  return res.status(200).json({
    code: 0,
  });
};

export default withIronSessionApiRoute(handler, ironOptions);
