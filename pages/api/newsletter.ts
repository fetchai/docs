import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const email = req.body;
  try {
    const headers = {
      Authorization: `Bearer ${process.env.SENDER_TOKEN}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    const data = {
      email: email,
      groups: ["e1rVB0"],
    };

    const response = await fetch(
      `${process.env.NEWSLETTER_BASE_URL}/v2/subscribers`,
      {
        method: "POST",
        headers,
        body: JSON.stringify(data),
      },
    ).then((response) => response.json());
    if (!response.success) {
      console.log("unable to subscribe user");
    }
    return res.status(200).json({ response });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
