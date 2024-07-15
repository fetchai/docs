import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { search_term, selected_path } = req.body;
    const response = await fetch(`${process.env.BACKEND_URL}/api/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        search_term: search_term,
        selected_path: selected_path,
      }),
    });
    const apiResponse = await response.json();
    return res.status(response.status).json({ apiResponse });
  } catch {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
