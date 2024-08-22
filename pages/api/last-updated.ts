import { NextApiRequest, NextApiResponse } from "next";
import { execSync } from "node:child_process";

export function getLastUpdatedDate(filePath: string) {
  try {
    const lastUpdatedDate = execSync(`git log -1 --format="%cd" -- ${filePath}`)
      .toString()
      .trim();
    return lastUpdatedDate;
  } catch (error) {
    console.error("Error getting last updated date:", error);
    return null;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { filePath } = req.body;
  try {
    const lastUpdatedDate = getLastUpdatedDate(filePath);
    return res.status(200).json({ lastUpdatedDate });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
