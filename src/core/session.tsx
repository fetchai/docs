import type { IronSessionOptions } from "iron-session";
import {
  Credentials,
  User,
} from "theme/fetch-ai-docs/contexts/context-provider";

export const sessionOptions: IronSessionOptions = {
  password: "temporary_wisidjsjddjdidkjdnd09393ndnmmddkmmdd",
  cookieName: "docs",
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
