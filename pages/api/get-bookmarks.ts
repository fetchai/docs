import { NextApiRequest, NextApiResponse } from "next";
import { getAccessToken } from "./utils/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { user_email, is_visible } = req.query;
  const accessToken = await getAccessToken( req, res );

  let myHeaders = new Headers()

  myHeaders.append("Authorization", `"Bearer ${accessToken}"`);
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/bookmarks?user_email=${user_email}&is_visible=${is_visible}`,
      {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
        mode: "cors"
      },
    );
    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
