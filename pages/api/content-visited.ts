/* eslint-disable no-useless-catch */
import { getCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";
import { apiCall, setAccessToken } from "./utils/api";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { user_email } = req.query;

    // Get the access token from wherever you have stored it
    const accessToken = getCookie("fauna", { req, res });

    // Set the access token
    setAccessToken(accessToken);

    const refreshToken = getCookie("refresh_token", { req, res });

    const response = await apiCall(
      "GET",
      `/api/page-view/?user_email=${user_email}`,
      refreshToken,
      {},
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response.status || 500).json({ error: error.message });
  }
};
