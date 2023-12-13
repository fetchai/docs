import React, { useEffect, useState } from "react";
import { GoBookmark } from "react-icons/go";
import { BsBookmarkCheckFill } from "react-icons/bs";
import { useUserContext } from "../contexts/context-provider";
import router from "next/router";

const handleSignin = () => {
  const currentProtocol = window.location.protocol;
  const currentHostname = window.location.hostname;
  const currentPort = window.location.port;
  const redirectUri = `${currentProtocol}//${currentHostname}:${currentPort}/docs/auth`;
  const loginUrl =
    `https://accounts.fetch.ai/login/` +
    `?redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&client_id=docs` +
    `&response_type=code`;
  router.push(loginUrl);
};

const Bookmark = ({
  onClickBookMark,
  bookMark,
}: {
  onClickBookMark: (isVisible: boolean) => void;
  bookMark: boolean;
}) => {
  const fetchBookMarks = async (context, isVisible) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/bookmarks?user_email=${context?.user?.email}&is_visible=${isVisible}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const bookmark = await response.json();
      return bookmark;
    } catch (error) {
      console.log("---oops, something went wrong----", error);
    }
  };
  console.log({ bookMark });
  const [isVisible, setIsVisible] = useState(bookMark);
  const context = useUserContext();

  const pathname = typeof window !== "undefined" && window?.location?.pathname

  useEffect(() => {
    setIsVisible(bookMark);
  }, [bookMark, pathname]);
  const handleToggleBookmark = async () => {
    const newVisibilityState = !isVisible;
    onClickBookMark(newVisibilityState);
    await fetchBookMarks(context, newVisibilityState);
    setIsVisible(() => newVisibilityState);
  };

  console.log({ isVisible });
  return (
    <div
      onClick={context.isLoggedIn ? handleToggleBookmark : handleSignin}
      style={{ borderRadius: "10px" }}
      className="nx-flex nx-mt-4 nx-mr-4 nx-cursor-pointer nx-gap-1 nx-flex-row nx-justify-between nx-items-center nx-p-2 nx-gap-y-6 grey-background"
    >
      {isVisible ? (
        <BsBookmarkCheckFill style={{ fontSize: "20px" }} />
      ) : (
        <GoBookmark style={{ fontSize: "20px" }} />
      )}

      <span className="nx-text-sm nx-font-normal nx-leading-7">Bookmark</span>
    </div>
  );
};

export default Bookmark;
