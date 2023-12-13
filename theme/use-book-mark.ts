import { useEffect, useState } from "react";

const useBookMark = (context, is_visible) => {
  const [bookMarks, setBookMarks] = useState();
  const fetchBookMarks = async (context) => {
    try {
      const response = await fetch(
        `http://localhost:8000//api/bookmarks?user_email=${context?.user?.email}&is_visible=${is_visible}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const bookmark = await response.json();
      setBookMarks(bookmark);
    } catch (error) {
      console.log("---oops, something went wrong----", error);
    }
  };

  const pathname = typeof window !== "undefined" && window?.location?.pathname

  useEffect(() => {
    if (context?.user?.email) {
      fetchBookMarks(context);
    }
  }, [context?.user?.email, pathname]);

  const onClickBookMark = async (newVisibilityState: boolean) => {
    try {
      await fetch("http://localhost:8000/api/bookmark", {
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
    } catch (error) {
      console.log("---oops, something went wrong----", error);
    }
  };
  return {
    state: { bookMarks },
    action: { onClickBookMark },
  };
};

export default useBookMark;
