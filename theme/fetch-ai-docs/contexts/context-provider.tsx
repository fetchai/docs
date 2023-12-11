import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { refreshAccessToken } from "./refresh-token";
import fetchJson from "src/lib/fetch-json";
import useSWR, { mutate } from "swr";

export interface User {
  email: string;
  id?: string;
  walletAddress?: string;
  givenName?: string;
  familyName?: string;
  avatarHref?: string;
}

export interface Credentials {
  apiKey: string;
  expiresAt: number;
  group?: "internal";
  sub?: string;
}

interface UserContextData {
  user: User;
  credentials: Credentials;
}

export interface UserContextProperties {
  session?: UserContextData;
}

export interface UserInformation {
  user: User;
  credentials: Credentials;
  signOut(): void;
  isLoading: boolean;
  isLoggedIn: boolean;
  isFetchAccount: boolean;
}

const DEFAULT_USER: User = {
  email: "",
  walletAddress: "",
};

const DEFAULT_CREDENTIALS: Credentials = {
  apiKey: "",
  expiresAt: 0,
  group: undefined,
  sub: undefined,
};

export const UserContext = React.createContext<UserInformation>({
  user: DEFAULT_USER,
  credentials: DEFAULT_CREDENTIALS,
  // eslint-disable-next-line unicorn/empty-brace-spaces
  signOut: () => {},
  isLoading: false,
  isLoggedIn: false,
  isFetchAccount: false,
});

export function useUserContext() {
  return useContext(UserContext);
}

export const UserInfoProvider: React.FC<{
  children?: React.ReactNode | undefined;
}> = ({ children }) => {
  const { data, isLoading } = useSWR("/docs/api/profile", fetchJson);
  const context = data as UserInformation;

  const [user, setUser] = useState<User>(context?.user ?? DEFAULT_USER);
  const [isFetchAccount, setIsFetchAccount] = useState<boolean>(false);
  const [credentials, setCredentials] = useState<Credentials>(
    context?.credentials ?? DEFAULT_CREDENTIALS,
  );
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(context?.isLoggedIn);
  const router = useRouter();

  const signOut = async () => {
    setUser(DEFAULT_USER);
    setCredentials(DEFAULT_CREDENTIALS);
    mutate(await fetchJson("/docs/api/signout", { method: "POST" }), {
      revalidate: true,
    });
    setIsLoggedIn(false);
  };

  const resetUserName = () => {
    setUser(DEFAULT_USER);
    setCredentials(DEFAULT_CREDENTIALS);
  };

  const userEmail = context?.user?.email;
  useEffect(() => {
    if (
      context?.user != undefined &&
      context?.credentials != undefined &&
      context?.isLoggedIn !== undefined &&
      context?.credentials?.expiresAt > credentials?.expiresAt &&
      context?.credentials.expiresAt > Date.now()
    ) {
      setUser(context?.user);
      setCredentials(context?.credentials);
      setIsLoggedIn(context?.isLoggedIn);
    } else if (
      !context?.credentials ||
      (context?.credentials?.expiresAt > 0 &&
        context?.credentials?.expiresAt <= Date.now())
    ) {
      resetUserName();
    }
    if (userEmail && userEmail.includes("fetch.ai")) {
      setIsFetchAccount(true);
    } else {
      setIsFetchAccount(false);
    }
    const monitor = setInterval(async () => {
      if (credentials?.expiresAt > 0 && credentials?.expiresAt <= Date.now()) {
        resetUserName();
      } else {
        const newToken = await refreshAccessToken(credentials);
        if (newToken) {
          setCredentials({
            apiKey: newToken?.accessToken,
            expiresAt: newToken?.expiresIn,
            group: newToken?.group,
          });
        }
      }
    }, 5000);
    return () => clearInterval(monitor);
  }, [context, router]);

  useEffect(() => {
    setUser({
      ...user,
      email: context?.user?.email,
      walletAddress: context?.user?.walletAddress,
      avatarHref: context?.user?.avatarHref,
    });
    setCredentials({
      ...credentials,
      apiKey: context?.credentials?.apiKey,
      expiresAt: context?.credentials?.expiresAt,
      sub: context?.credentials?.sub,
    });
    setIsLoggedIn(context?.isLoggedIn);
  }, [
    context?.credentials?.apiKey,
    context?.user?.email,
    context?.user?.walletAddress,
    context?.isLoggedIn,
  ]);

  return (
    <UserContext.Provider
      value={{
        user,
        credentials,
        signOut,
        isLoading,
        isLoggedIn,
        isFetchAccount,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
