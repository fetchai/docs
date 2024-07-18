import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { feedback_type, description, page_url } = req.body;
    const response = await fetch(`${process.env.BACKEND_URL}/api/feedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        feedback_type: feedback_type,
        description: description,
        page_url: page_url,
      }),
    });
    const apiResponse = await response.json();
    return res.status(response.status).json({ apiResponse });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
