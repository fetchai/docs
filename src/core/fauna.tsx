export async function getTokenFromAuthCode(authCode: string): Promise<string> {
  const r = await fetch(`https://accounts.fetch.ai/v1/tokens`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      grant_type: "authorization_code",
      code: authCode,
      client_id: "docs",
    }),
  });

  if (!r.ok) {
    throw new Error("Failed to get token");
  }

  const { access_token } = await r.json();
  return access_token;
}

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
