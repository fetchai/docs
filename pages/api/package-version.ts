import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { packageName, packageType } = req.body;
    let url: string;
    if (packageType === "pypi") {
      url = `https://pypi.org/pypi/${packageName}/json`;
    } else if (packageType === "npm") {
      url = `https://registry.npmjs.org/${packageName}/latest`;
    }
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const apiResponse = await response.json();
    const latestVersion =
      packageType === "pypi"
        ? apiResponse?.info?.version
        : apiResponse?.version;
    return res.status(response.status).json({ latestVersion });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
