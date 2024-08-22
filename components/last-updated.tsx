import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

const LastUpdatedTime = ({ filePath }: { filePath: string }) => {
  const DEFAULT_LOCALE = "en-US";
  const { locale = DEFAULT_LOCALE } = useRouter();
  const [lastUpdated, setLastUpdated] = useState<Date | undefined>(undefined);

  useEffect(() => {
    const fetchLastUpdated = async () => {
      try {
        const response = await fetch("/docs/api/last-updated", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            filePath,
          }),
        });
        const responseJson = await response.json();
        const updatedDate = new Date(responseJson?.lastUpdatedDate);
        setLastUpdated(updatedDate);
      } catch (error) {
        console.error("Error fetching the last updated time:", error);
      }
    };

    fetchLastUpdated();
  }, [filePath]);

  return (
    <>
      <div className="nx-flex nx-gap-1 nx-text-xs nx-font-normal nx-mt-12 nv-mb-6 nx-text-gray-500 ltr:nx-text-right rtl:nx-text-left dark:nx-text-gray-400">
        <span>Last updated on </span>
        <time dateTime={lastUpdated?.toISOString()}>
          {lastUpdated?.toLocaleDateString(locale, {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </time>
      </div>
    </>
  );
};

export default LastUpdatedTime;
