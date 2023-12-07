import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "src/core/session";
import { NextApiRequest, NextApiResponse } from "next";

type User = {
  email: string;
  avatarHref: string;
  id: string;
  walletAddress?: string;
};

type Credentials = {
  apiKey: string;
  expiresAt: number;
  group: string;
  sub: string;
};

export type CombinedData = {
  user?: User;
  credentials?: Credentials;
  isLoggedIn: boolean;
};

async function userRoute(
  request: NextApiRequest,
  response: NextApiResponse<CombinedData>,
) {
  response.setHeader("Cache-Control", "no-cache, maxage=0, must-revalidate");
  if (request.session.user || request.session.credentials) {
    const user: User = {
      email: request.session.user?.email ?? "",
      walletAddress: request.session.user?.walletAddress ?? "",
      avatarHref: request.session.user?.avatarHref ?? "",
      id: request.session.user?.id ?? "",
    };

    const credentials: Credentials = {
      apiKey: request.session.credentials?.apiKey ?? "",
      expiresAt: request.session.credentials?.expiresAt ?? 0,
      group: request.session.credentials?.group ?? "",
      sub: request.session.credentials?.sub ?? "",
    };

    const combinedData: CombinedData = {
      user,
      credentials,
      isLoggedIn: true,
    };

    response.json(combinedData);
  } else {
    response.json({
      isLoggedIn: false,
    });
  }
}

export default withIronSessionApiRoute(userRoute, sessionOptions);
