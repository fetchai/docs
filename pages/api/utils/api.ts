import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { getNewAccessToken } from "src/core/fauna";
import { parseJwt } from "src/core/jwt";

export const getAccessToken = async (req, res) => {
  try {
    let accessToken = getCookie("fauna", { req, res });
    const refreshToken = getCookie("refresh_token", { req, res });

    if (!accessToken || !refreshToken) {
      throw { message: "Access token or refresh token is missing" };
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const decodedToken: any = parseJwt(accessToken);
    if (!decodedToken) {
      throw { message: "Invalid access token" };
    }

    if (decodedToken.expiry < Date.now() - 5000) {
      // Access token expired, refresh it
      const newAcessToken = await getNewAccessToken(refreshToken);
      if (newAcessToken.accessToken) {
        accessToken = newAcessToken.accessToken;
        setCookie("fauna", newAcessToken, { req, res });
      } else {
        deleteCookie("fauna");
      }
    }

    return accessToken;
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
