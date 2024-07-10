interface TokenInformation {
  expiry: number;
  group?: "internal";
  sub: string;
}

export function parseJwt(token: string): TokenInformation {
  const payload = JSON.parse(
    Buffer.from(token.split(".")[1], "base64").toString(),
  );

  const expiry = (payload.exp as number) * 1000;

  return { expiry: expiry, group: payload.grp, sub: payload.sub };
}
