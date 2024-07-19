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
