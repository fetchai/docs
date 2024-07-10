import type { IronSessionOptions } from "iron-session";
import {
  Credentials,
  User,
} from "theme/fetch-ai-docs/contexts/context-provider";

export const sessionOptions: IronSessionOptions = {
  password: process.env.NEXT_PUBLIC_COOKIE_PASSWORD,
  cookieName: process.env.NEXT_PUBLIC_CLIENT_ID,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

declare module "iron-session" {
  interface IronSessionData {
    user: User | null;
    credentials: Credentials | null;
  }
}
