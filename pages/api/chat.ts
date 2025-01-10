// src/pages/api/chat.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { message } = req.body;

    try {
      const response = await fetch(
        "https://chat-with-docs-rzql.onrender.com/echo",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: message }),
        },
      );
      const data = await response.json();
      return res.status(200).json({ reply: data.message });
    } catch (error) {
      console.log("error", error);
      return res
        .status(500)
        .json({ reply: "Something went wrong. Please try again." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
