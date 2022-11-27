import type { NextApiRequest, NextApiResponse } from "next";
import { Twilio } from "twilio";
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
  if (req.method !== "POST")
    return res.status(405).json({ code: -1, message: "Method Not Allowed" });
  const session: ISession = req.session;
  const { to = "" } = req.body;
  const {
    TWILIO_SID = "",
    TWILIO_TOKEN = "",
    TWILIO_NUMBER = "",
  } = process.env;
  // random code
  const verifyCode = Math.floor(Math.random() * (9999 - 1000)) + 1000;
  console.log("verifyCode: ", verifyCode);
  const client = new Twilio(TWILIO_SID, TWILIO_TOKEN);
  const response = await client.messages.create({
    from: TWILIO_NUMBER,
    to,
    body: "NEXT EARTH:\nyour code: " + verifyCode,
  });
  if (response.errorMessage) {
    return res.status(401).json({ code: -1, message: "SMS service error" });
  }
  // save it into session
  session.verifyCode = verifyCode;
  await session.save();
  res.status(200).json({ code: 0 });
};

export default withIronSessionApiRoute(handler, ironOptions);
