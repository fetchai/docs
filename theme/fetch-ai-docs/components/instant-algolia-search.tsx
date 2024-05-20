// components/Search.js
import { InstantSearch, Configure, SearchBox, Hits } from "react-instantsearch";
import algoliasearch from "algoliasearch/lite";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import React from "react";
// import type { Item as NormalItem } from "nextra/normalize-pages";

// type MyItem = NormalItem & {
//   // Add or modify properties as needed
//   tags?: string[];
// };
// Search API key and application ID below
const searchClient = algoliasearch(
  "J27DIPDG4S",
  "601cad4cf7041d99c1bdf42f4d4843d6",
);
const indexName = "14-3-24-index";

export const InstantAlgoliaSearch = () => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  function Hit({
    hit,
  }: {
    hit: { path: string; title: string; content: string };
  }) {
      const x = (
        <div className="nx-flex nx-flex-col">
          <div
            className="nx-w-full"
            onClick={() => {
              router.push(hit.path.split("/docs")[1]);
            }}
          >
            <div className="nx-py-2 nx-cursor-pointer nx-bg-grey-200 nx-text-sm nx-text-grey-600 nx-font-semibold nx-tracking-loose nx-uppercase">
              <div className="nx-ml-4">
              {hit.title.replaceAll("#", "")}
              </div>
            </div>
            <div className="nx-flex-grow-1 nx-ml-4 nx-mt-5 nx-mb-5 nx-font-normal nx-text-sm">
              {hit.content.slice(0, 160)}
            </div>
            <div className="nx-text-sm nx-ml-4 nx-text-grey-600 nx-mb-2 nx-mt-2">
              {hit.path.replaceAll("/", ">").replace(">docs>", "")}
            </div>
          </div>
          <div className="nx-border-b" />
        </div>
      );
      return x;
  }

  // Close dropdown on outside click
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShow(false);
      }
    },
    [setShow],
  );

  const queryHook = (query, search) => {
    if (query === "") {
      setShow(false);
    } else {
      search(query);
      setShow(true);
    }
  };

  // Add click event listener when the component mounts
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);
  return (
    <div className="nx-w-full">
      <InstantSearch searchClient={searchClient} indexName={indexName}>
        <div ref={dropdownRef}>
          <Configure hitsPerPage={4} />
          <SearchBox
            className="nx-justify-center nx-w-full nx-flex"
            queryHook={queryHook}
            placeholder="Search..."
            classNames={{
              input:
                "nx-bg-gray-50 nx-border nx-w-full nx-border-gray-300 nx-text-gray-900 nx-text-lg nx-p-2 nx-rounded-lg nx-focus:ring-blue-500 nx-focus:border-blue-500 nx-block  nx-p-2.5 nx-dark:bg-gray-700 nx-dark:border-gray-600 nx-dark:placeholder-gray-400 nx-dark:text-white nx-dark:focus:ring-blue-500 nx-dark:focus:border-blue-500",
              submit: "nx-hidden",
              reset: "nx-hidden",
            }}
          />
            {
              show &&
                <Hits
                classNames={{
                  list: "nx-absolute nx-mt-2 nextra-scrollbar nx-w-ful  nx-border nx-border-gray-200 nx-h-64 dark:nx-border-neutral-800 nx-z-20 nx-mt-2 dark:nx-bg-neutral-900 nx-rounded-xl nx-py-2.5 nx-shadow-xl nx-bg-white nx-border-b-2",
                  item: "nx-bg-search-result",
                  emptyRoot:"nx-px-2"
                }}
                hitComponent={Hit}
              />
            } 
        </div>
      </InstantSearch>
    </div>
  );
};
