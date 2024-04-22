import { useEffect, useState } from "react";

const useContentVisited = (context) => {
  const [contentVisited, setContentVisited] = useState();

  const fetchContentVisited = async (context) => {
    try {
      const response = await fetch(
        `/docs/api/content-visited/?user_email=${context?.user?.email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const apiResponse = await response.json();
      setContentVisited(apiResponse);
      return apiResponse;
    } catch (error) {
      console.log("oops, something went wrong", error);
    }
  };

  const pathname = typeof window !== "undefined" && window?.location?.pathname;

  useEffect(() => {
    if (context?.user?.email) {
      fetchContentVisited(context);
    }
  }, [context?.user?.email, pathname]);

  const onClickSetContentVisited = async (contentPath: string) => {
    try {
      await fetch(`/docs/api/set-content-visited`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_email: context?.user?.email,
          saved_path: contentPath,
          is_visible: true,
        }),
      });

      const visitedContent = await fetchContentVisited(context);
      setContentVisited(visitedContent);
    } catch (error) {
      console.log("something went wrong", error);
    }
  };
  return {
    state: { contentVisited },
    action: { onClickSetContentVisited, fetchContentVisited },
  };
};

export default useContentVisited;
