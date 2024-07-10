export async function getTokenFromAuthCode(authCode: string): Promise<{
  access_token: string;
  refresh_token: string;
}> {
  const r = await fetch(
    `${process.env.NEXT_PUBLIC_FETCH_ACCOUNTS_URL}/v1/tokens`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        grant_type: "authorization_code",
        code: authCode,
        client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
      }),
    },
  );

  if (!r.ok) {
    throw new Error("Failed to get token");
  }

  const { access_token, refresh_token } = await r.json();
  return {
    access_token: access_token,
    refresh_token: refresh_token,
  };
}

export async function getNewAccessToken(currentToken: string) {
  if (!currentToken) {
    return;
  }
  const r = await fetch(
    `${process.env.NEXT_PUBLIC_FETCH_ACCOUNTS_URL}/v1/tokens`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        grant_type: "refresh_token",
        refresh_token: currentToken,
      }),
    },
  );

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
