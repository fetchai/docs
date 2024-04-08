import router from "next/router";

export const handleSignin = () => {
  const currentProtocol = window.location.protocol;
  const currentHostname = window.location.hostname;
  const currentPort = window.location.port;
  const redirectUri = `${currentProtocol}//${currentHostname}:${currentPort}/docs/auth`;
  const loginUrl =
    `https://accounts.fetch.ai/login/` +
    `?redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&client_id=docs` +
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

export const capitalizeWords = (str: string) => {
  return str.replaceAll(/(?:^|-)([a-z])/g, function (char) {
    return char.toUpperCase().replace("-", " ");
  });
};

export const addUnderscoreInText = (text) => {
  const lowercasedText = text.toLowerCase();
  const snakecasedText = lowercasedText.replaceAll(/\s+/g, "_");
  return snakecasedText;
};
