import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { user_email } = req.query;
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/page-view/?user_email=${user_email}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const apiResponse = await response.json();
    return res.status(response.status).json(apiResponse);
  } catch (error) {
    console.error(error);
    return res.status(500).json([]);
  }
}
