import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { user_email, saved_path, is_visible } = req.body;
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/api/bookmark`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_email: user_email,
        saved_path: saved_path,
        is_visible: is_visible,
      }),
    });
    const apiResponse = await response.json();
    return res.status(response.status).json({ apiResponse });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
