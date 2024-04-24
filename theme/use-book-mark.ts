import { useEffect, useState } from "react";

const useBookMark = (context) => {
  const [bookMarks, setBookMarks] = useState<undefined | string[]>([]);
  const [bookMarkSuccess, setBookMarkSuccess] = useState<string>("");
  const fetchBookMarks = async (email, isBookMark) => {
    try {
      const response = await fetch(
        `/docs/api/get-bookmarks?user_email=${email}&is_visible=${isBookMark}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status === 200) {
        const bookmark = await response.json();
        setBookMarks(bookmark);
        return bookmark;
      } else {
        setBookMarks([]);
        return [];
      }
    } catch (error) {
      setBookMarks([]);
      console.log("oops, something went wrong", error);
      return [];
    }
  };

  const pathname = typeof window !== "undefined" && window?.location?.pathname;

  useEffect(() => {
    if (context?.user?.email) {
      fetchBookMarks(context?.user?.email, true);
    }
  }, [context?.user?.email, pathname]);

  const onClickBookMark = async (newVisibilityState: boolean) => {
    try {
      const resp = await fetch(`/docs/api/set-bookmarks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_email: context?.user?.email,
          saved_path: window.location.pathname,
          is_visible: newVisibilityState,
        }),
      });

      if (resp.status === 200) {
        if (newVisibilityState) {
          setBookMarkSuccess("Bookmark updated successfully");
        } else {
          setBookMarkSuccess("Bookmark removed successfully");
        }
      }
      const bookmark = await fetchBookMarks(
        context?.user?.email,
        newVisibilityState,
      );
      setBookMarks(bookmark);
      setTimeout(() => {
        setBookMarkSuccess("");
      }, 2000);
    } catch (error) {
      console.log("something went wrong", error);
    }
  };
  return {
    state: { bookMarks, bookMarkSuccess, setBookMarkSuccess },
    action: { onClickBookMark, fetchBookMarks },
  };
};

export default useBookMark;
