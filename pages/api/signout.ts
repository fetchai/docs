import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "src/core/session";
import { NextApiRequest, NextApiResponse } from "next";
import { CombinedData } from "./profile";

async function userRoute(
  request: NextApiRequest,
  response: NextApiResponse<CombinedData>,
) {
  response.setHeader("Cache-Control", "no-cache, maxage=0, must-revalidate");
  request.session.destroy();
  response.json({
    isLoggedIn: false,
    user: { email: "", avatarHref: "", id: "" },
    credentials: { apiKey: "", expiresAt: 0, group: "", sub: "" },
  });
}

export default withIronSessionApiRoute(userRoute, sessionOptions);
