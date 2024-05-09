import { setCookie, getCookie } from "cookies-next";
import jwt from "jsonwebtoken";


class CustomError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export const getNewAccessToken = async (refreshToken: string) => {
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

export const getAccessToken = async (req, res)=> {
	try {
    let accessToken = getCookie("fauna", { req, res });
    const refreshToken = getCookie("refresh_token", { req, res });

    if (!accessToken || !refreshToken) {
      throw { message: "Access token or refresh token is missing" };
    }

    // Decode and verify access token
    const decodedToken: any = jwt.decode(accessToken);
    if (!decodedToken) {
      throw { message: "Invalid access token" };
    }

    if (decodedToken.exp * 1000 < (Date.now() - 5000)) {
      // Access token expired, refresh it
      const newAcessToken = await getNewAccessToken(refreshToken);
			accessToken = newAcessToken
      setCookie("fauna", newAcessToken, { req, res });
    }

		return accessToken
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}
