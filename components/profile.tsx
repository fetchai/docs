import React, { ReactNode, useEffect, useState } from "react";
import { useUserContext } from "theme/fetch-ai-docs/contexts/context-provider";
import { capitalizeWords } from "theme/fetch-ai-docs/helpers";
import Avatar from "../src/images/avatar.svg";
import Image from "next/image";
import { Anchor } from "@nextra/docs-theme/anchor";
import isAuth from "theme/fetch-ai-docs/auth";

const convertString = (input) =>
  input.replace(/^\//, "").replaceAll("/", " > ");

const ProfileHeader = ({
  avatarHref,
  userName,
  email,
  group,
  profileInfo,
}: {
  avatarHref: string;
  userName: string;
  email: string;
  group: string;
  profileInfo: ReactNode;
}) => (
  <div className="nx-flex nx-p-6 nx-flex-wrap nx-gap-10 nx-mb-6">
    <div className="nx-relative nx-inline-block nx-rounded-2xl">
      <Image
        className="nx-rounded-2xl"
        width={100}
        src={avatarHref ?? Avatar}
        height={100}
        alt="Profile"
      />
    </div>
    <div className="nx-flex nx-flex-wrap nx-items-start nx-justify-between nx-mb-2">
      <div className="nx-flex nx-gap-1 nx-flex-col">
        <div className="nx-flex nx-items-center">
          <a className="nx-text-secondary-inverse nx-hover:text-primary nx-transition-colors nx-duration-200 nx-ease-in-out nx-font-semibold nx-text-[1.5rem] nx-mr-1">
            {userName}
          </a>
        </div>
        <div className="nx-flex nx-flex-wrap nx-font-medium">
          <a className=" ">
            <span className="nx-flex nx-capitalize nx-rounded-md nx-bg-gray-100 nx-items-center nx-px-1 nx-mr-5">
              {group}
            </span>
          </a>
          <a className="nx-flex nx-items-center nx-mb-2 nx-mr-5 nx-text-secondary-dark nx-hover:text-primary">
            <span className="nx-mr-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="nx-w-5 nx-h-5"
              >
                <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
              </svg>
            </span>
            {email}
          </a>
        </div>
        {profileInfo}
      </div>
    </div>
  </div>
);

const ProfileInfo = ({
  bookmarks,
  pageViews,
}: {
  bookmarks: string[];
  pageViews: string[];
}) => (
  <div className="nx-flex nx-flex-wrap nx-justify-between">
    <div className="nx-flex nx-flex-wrap nx-items-center">
      <div className="nx-mr-3 nx-mb-2 nx-inline-flex nx-items-center nx-justify-center nx-text-secondary-inverse  nx-rounded-md nx-bg-neutral-100  nx-px-3 nx-py-1 nx-text-sm nx-font-medium nx-leading-normal">
        {bookmarks?.length} Bookmarks
      </div>
      <div className="nx-mr-3 nx-mb-2 nx-inline-flex nx-items-center nx-justify-center nx-text-secondary-inverse nx-rounded-md nx-bg-neutral-100  nx-px-3 nx-py-1 nx-text-sm nx-font-medium nx-leading-normal">
        {pageViews?.length} pages visited
      </div>
    </div>
  </div>
);

const ProfileBookmarks = ({ bookmarks }: { bookmarks: string[] }) => (
  <div>
    <h2 className="nx-text-xl nx-font-semibold nx-p-4 nx-mb-4">Bookmarks</h2>
    <table className="nx-w-full nx-text-sm nx-text-left nx-rtl:text-right nx-text-gray-500 nx-dark:text-gray-400">
      <thead className="nx-text-xs nx-text-gray-700 nx-uppercase nx-bg-gray-50 nx-dark:bg-gray-700 nx-dark:text-gray-400">
        <tr>
          <th scope="col" className="nx-px-6 nx-py-3">
            Bookmarks
          </th>
        </tr>
      </thead>
      <tbody>
        {bookmarks?.map((bookmark, index) => (
          <tr
            key={index}
            className="nx-bg-white nx-border-b  hover:nx-bg-gray-100"
          >
            <td className="nx-px-6 nx-py-4 nx-font-medium nx-text-gray-900">
              <div className=" nx-flex nx-justify-between">
                <span>{capitalizeWords(bookmark.match(/[^/]+$/)[0])}</span>
                <Anchor
                  newWindow
                  href={bookmark}
                  className="nx-bg-gray-100 nx-cursor-pointer hover:nx-text-blue-500 nx-p-1 nx-font-extralight nx-rounded-md"
                >
                  {convertString(bookmark)}
                </Anchor>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const ProfilePageViews = ({ pageViews }: { pageViews: string[] }) => (
  <div className="nx-mt-6">
    <h2 className="nx-text-xl nx-font-semibold nx-p-4 nx-mb-4">
      Pages Visited
    </h2>
    <div className="nx-flex nx-flex-wrap nx-gap-2 nx-p-4">
      {pageViews?.map((pageView, index) => (
        <div
          key={index}
          className="nx-bg-gray-100 nx-px-3 nx-py-1 nx-rounded-full nx-text-gray-900"
        >
          {pageView}
        </div>
      ))}
    </div>
  </div>
);

const Profile = () => {
  const context = useUserContext();
  const [data, setData] = useState({ bookmarks: [], page_views: [] });

  const fetchProfile = async (email) => {
    if (email) {
      const resp = await fetch(`/docs/api/profile-data?user_email=${email}`);
      const profileData = await resp.json();
      setData(profileData);
    }
  };

  useEffect(() => {
    fetchProfile(context?.user?.email);
  }, [context?.user?.email]);

  const { bookmarks, page_views: pageViews } = data;

  return (
    <div className="nx-flex nx-flex-col nx-w-full nx-mb-6  nx-border nx-border-dashed nx-bg-clip-border nx-rounded-2xl">
      <div className="nx-flex-auto nx-bg-transparent">
        <ProfileHeader
          avatarHref={context.user.avatarHref}
          userName={"Gautam gambhir"}
          email={context.user.email}
          group={context.credentials.group}
          profileInfo={
            <ProfileInfo bookmarks={bookmarks} pageViews={pageViews} />
          }
        />

        <ProfileBookmarks bookmarks={bookmarks} />
        <ProfilePageViews pageViews={pageViews} />
      </div>
    </div>
  );
};

export default isAuth(Profile);
