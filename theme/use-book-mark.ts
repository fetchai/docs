import { useEffect, useState } from "react";

const useBookMark = (context) => {
const [bookMarks , setBookMarks]= useState()
  const fetchBookMarks = async (context) => {
    try {
     const response = await fetch(
        `http://localhost:8000/api/bookmarks?user_email=${context?.user?.email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const bookmark = await response.json()
      setBookMarks(bookmark.bookmarks)
    } catch (error) {
      console.log("---oops, something went wrong----", error);
    }
  };

  useEffect(() => {
    if(context?.user?.email){
        fetchBookMarks(context);
    }
  }, [context?.user?.email]);

  const onClickBookMark = async (newVisibilityState: boolean) => {
    try {
      await fetch("http://localhost:8000/api/bookmark", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_email: context?.user?.email,
          saved_path: window.location.href,
          is_visible: newVisibilityState,
        }),
      });
    } catch (error) {
      console.log("---oops, something went wrong----", error);
    }
  };
  return {
    state: {bookMarks},
    action: { onClickBookMark },
  };
};

export default useBookMark;
