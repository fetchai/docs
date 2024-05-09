/* eslint-disable no-useless-catch */
import { NextApiRequest, NextApiResponse } from "next";
import { getAccessToken } from "./utils/api";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { user_email } = req.query;

    const accessToken = await getAccessToken(req, res);

    const myHeaders = new Headers();

    myHeaders.append("Authorization", `"Bearer ${accessToken}"`);

    const response = await fetch(
      `${process.env.BACKEND_URL}/api/page-view/?user_email=${user_email}`,
      {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
        mode: "cors",
      },
    );
    const data = await response.json();

    return res.status(response.status).json(data);
  } catch (error) {
    res.status(error.response.status || 500).json({ error: error.message });
  }
};
