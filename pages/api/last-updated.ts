// pages/api/last-updated.ts
import { NextApiRequest, NextApiResponse } from "next";
import simpleGit from "simple-git";

async function getNoteLastUpdatedTimestamp(): Promise<Date> {
  try {
    const git = simpleGit();
    const log = await git.log({ file: `pages/notes.mdx`, n: 1 });

    if (log && log.latest) {
      const timestamp = new Date(log.latest.date);
      return timestamp;
    } else {
      throw new Error("No commit history found for the specified file");
    }
  } catch (error) {
    console.error("Error getting last updated timestamp:", error);
    throw new Error("Error getting last updated timestamp");
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    // Implement the logic to retrieve the last updated timestamp of the relevant docs file
    // For demonstration purposes, a static timestamp is used here
    const lastUpdatedTimestamp = await getNoteLastUpdatedTimestamp();

    res.status(200).json({ lastUpdatedTimestamp });
  } catch (error) {
    console.error("Error fetching last updated timestamp:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
