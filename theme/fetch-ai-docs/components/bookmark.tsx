import React, { useEffect, useState } from "react";
import { GoBookmark } from "react-icons/go";
import { BsBookmarkCheckFill } from "react-icons/bs";
import { useUserContext } from "../contexts/context-provider";
import { handleSignin } from "../helpers";

const Bookmark = ({
  onClickBookMark,
  bookMark,
}: {
  onClickBookMark: (isVisible: boolean) => void;
  bookMark: boolean;
}) => {
  const [isVisible, setIsVisible] = useState(bookMark);
  const context = useUserContext();

  const pathname = typeof window !== "undefined" && window.location?.pathname;

  useEffect(() => {
    setIsVisible(bookMark);
  }, [bookMark, pathname]);

  const handleToggleBookmark = async () => {
    const newVisibilityState = !isVisible;
    onClickBookMark(newVisibilityState);
    setIsVisible(newVisibilityState);
  };

  const handleClick = context.isLoggedIn ? handleToggleBookmark : handleSignin;

  const bookmarkIcon = isVisible ? (
    <BsBookmarkCheckFill style={{ fontSize: "20px" }} />
  ) : (
    <GoBookmark style={{ fontSize: "20px" }} />
  );

  return (
    <div
      onClick={handleClick}
      style={{ borderRadius: "10px" }}
      className="nx-flex nx-mt-4 nx-mr-4 nx-cursor-pointer nx-gap-1 nx-flex-row nx-justify-between nx-items-center nx-p-2 nx-gap-y-6 grey-background"
    >
      {bookmarkIcon}
      <span className="text-sm font-normal leading-7">Bookmark</span>
    </div>
  );
};

export default Bookmark;
