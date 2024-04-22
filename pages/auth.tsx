import React from "react";
import { withIronSessionSsr } from "iron-session/next";
import { parseJwt } from "src/core/jwt";
import { sessionOptions } from "src/core/session";
import { getTokenFromAuthCode } from "src/core/fauna";
import { setCookie } from "cookies-next";

export function flatten(normalized = ""): string {
  if (Array.isArray(normalized)) {
    return normalized.join(" ");
  }
  return normalized;
}

const Page: React.FC = () => {
  return <>This is the auth page</>;
};

export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
  query,
}) {
  const authFailure = async () => {
    req.session.user;
    req.session.credentials;
    await req.session.save();
  };

  const authCode = flatten(query.code as string);
  if (authCode === "") {
    await authFailure();
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const token = await getTokenFromAuthCode(authCode);
  setCookie("fauna", token.access_token, { req, res });
  setCookie("refresh_token", token.refresh_token, { req, res });

  const r = await fetch(`https://accounts.fetch.ai/v1/profile`, {
    method: "GET",
    headers: {
      Authorization: `bearer ${token.access_token}`,
    },
  });
  if (!r.ok) {
    await authFailure();
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const profile = await r.json();
  const email: string | undefined = profile.email;
  const walletAddress: string | undefined = profile.wallet_address;
  const givenName: string | undefined = profile.given_name;
  const familyName: string | undefined = profile.family_name;
  const avatarHref: string | undefined = profile.image_url;
  const id: string | undefined = profile.client_id;

  const isEmailUser = email !== undefined;
  const isWalletUser = walletAddress !== undefined;
  const isValidUser = isEmailUser || isWalletUser;

  if (!isValidUser) {
    await authFailure();
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  req.session.user = {
    email: email ?? "",
    walletAddress: walletAddress ?? "",
    avatarHref,
    familyName,
    givenName,
    id,
  };
  const metadata = parseJwt(token.access_token);

  req.session.credentials = {
    apiKey: token.access_token,
    expiresAt: metadata.expiry,
    group: metadata.group,
    sub: metadata.sub,
  };

  await req.session.save();

  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
}, sessionOptions);

export default Page;
