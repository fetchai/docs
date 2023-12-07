import React from "react";
import { withIronSessionSsr } from "iron-session/next";
import { parseJwt } from "src/core/jwt";
import { sessionOptions } from "src/core/session";
import { getTokenFromAuthCode } from "src/core/fauna";

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
  const r = await fetch(`https://accounts.fetch.ai/v1/profile`, {
    method: "GET",
    headers: {
      Authorization: `bearer ${token}`,
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
  const metadata = parseJwt(token);

  req.session.credentials = {
    apiKey: token,
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
