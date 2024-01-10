import { useEffect, useState } from "react";

const useBookMark = (context) => {
  const [bookMarks, setBookMarks] = useState<undefined | boolean>();
  const fetchBookMarks = async (context, isBookMark) => {
    try {
      const response = await fetch(
        `https://profilio-staging.sandbox-london-b.fetch-ai.com/api/bookmarks?user_email=${context?.user?.email}&is_visible=${isBookMark}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const bookmark = await response.json();
      setBookMarks(bookmark);
      return bookmark;
    } catch (error) {
      console.log("oops, something went wrong", error);
    }
  };

  const pathname = typeof window !== "undefined" && window?.location?.pathname;

  useEffect(() => {
    if (context?.user?.email) {
      fetchBookMarks(context, true);
    }
  }, [context?.user?.email, pathname]);

  const onClickBookMark = async (newVisibilityState: boolean) => {
    try {
      await fetch(
        "https://profilio-staging.sandbox-london-b.fetch-ai.com/api/bookmark",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_email: context?.user?.email,
            saved_path: window.location.pathname,
            is_visible: newVisibilityState,
          }),
        },
      );

      const bookmark = await fetchBookMarks(context, newVisibilityState);
      setBookMarks(bookmark);
    } catch (error) {
      console.log("something went wrong", error);
    }
  };
  return {
    state: { bookMarks },
    action: { onClickBookMark, fetchBookMarks },
  };
};

export default useBookMark;
