/* eslint-disable no-useless-catch */
import axios from "axios";
import { getCookie, setCookie, deleteCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";

class CustomError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function getNewAccessToken(refreshToken: string) {
  try {
    const response = await fetch(`https://accounts.fetch.ai/v1/tokens`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
    });
    const data = await response.json();
    if (response.ok && response.status === 200) {
      return data.access_token;
    }
    if (response.status === 422) {
      throw new CustomError("Refresh token expired", 422);
    }
  } catch (refreshError) {
    throw new CustomError(refreshError.message, 422);
  }
}

async function retryRequest(
  req: NextApiRequest,
  res: NextApiResponse,
  accessToken: string,
  url: string,
) {
  try {
    const response = await axios({
      method: req.method,
      url: url,
      headers: { Authorization: `Bearer ${accessToken}` },
      data: req.body,
    });
    return res.status(response.status).json({ data: response.data });
  } catch (error) {
    return res
      .status(error.response.status)
      .json({ error: error.response.data });
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { url } = req.query;
  const accessToken = getCookie("fauna", { req, res });
  const refreshToken = getCookie("refresh_token", { req, res });

  try {
    const response = await axios({
      method: req.method,
      url: url as string,
      headers: { Authorization: `Bearer ${accessToken}` },
      data: req.body,
    });
    deleteCookie("fauna", { req, res });
    return res.status(response.status).json({ data: response.data });
  } catch (error) {
    if (error.response.status === 401) {
      try {
        const newAccessToken = await getNewAccessToken(refreshToken);
        if (newAccessToken) {
          setCookie("fauna", newAccessToken, { req, res });
          return await retryRequest(req, res, newAccessToken, url as string);
        } else {
          return res
            .status(422)
            .json({ message: "unable to got new access token" });
        }
      } catch (Error) {
        if (Error.status === 422) {
          return res.status(Error.status).json({ message: Error });
        }
        return res.status(500).json({ message: Error });
      }
    } else {
      return res
        .status(error.response.status)
        .json({ error: error.response.data });
    }
  }
}
