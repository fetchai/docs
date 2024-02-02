import { NextApiRequest, NextApiResponse } from "next";
import fs from "node:fs";
import path from "node:path";

async function findGuideByPath(filePath: string): Promise<unknown> {
  const content = fs.readFileSync(filePath, "utf8");
  return content;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const filePath = path.join(process.cwd(), "/pages/guides.mdx");

  try {
    const guide = await findGuideByPath(filePath);
    return res.status(200).json({ guide });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
