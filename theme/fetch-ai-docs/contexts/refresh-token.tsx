const minTokenExpiration = 15;

export async function getNewAccessToken(currentToken: string) {
  if (!currentToken) {
    return;
  }
  const r = await fetch(`https://accounts.fetch.ai/v1/tokens`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      grant_type: "refresh_token",
      refresh_token: currentToken,
    }),
  });

  if (!r.ok) {
    console.error("Could not request new token.");
    return;
  }

  const refresh_token = await r.json();

  if (!refresh_token) {
    return;
  }

  return {
    accessToken: refresh_token.access_token,
    expiresIn: (refresh_token.expires_in as number) * 1000,
    group: refresh_token.grp,
    id: "",
  };
}

export const refreshAccessToken = async (
  credentials?: {
    apiKey: string;
    expiresAt: number;
    group?: "internal";
  } | null,
) => {
  if (credentials == undefined) {
    return;
  }
  const diff = credentials.expiresAt - Date.now();
  const diffInMinutes = diff / (1000 * 60);

  if (diffInMinutes < minTokenExpiration) {
    return await getNewAccessToken(credentials.apiKey);
  }
};
