import router from "next/router";
export const handleSignin = () => {
  const currentProtocol = window.location.protocol;
  const currentHostname = window.location.hostname;
  const currentPort = window.location.port;
  const redirectUri = `${currentProtocol}//${currentHostname}:${currentPort}/docs/auth`;
  const loginUrl =
    `${process.env.NEXT_PUBLIC_FETCH_ACCOUNTS_URL}/login/` +
    `?redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}` +
    `&response_type=code` +
    `&sso=`;
  router.push(loginUrl);
};

export const isLinkInResponse = (response) => {
  const flattenedArray = response?.flat();
  const isPresent = flattenedArray?.includes(
    typeof window === "undefined" ? "" : window.location.pathname,
  );
  return isPresent;
};

export const addUnderscoreInText = (text) => {
  const lowercasedText = text.toLowerCase();
  const snakecasedText = lowercasedText.replaceAll(/\s+/g, "_");
  return snakecasedText;
};
