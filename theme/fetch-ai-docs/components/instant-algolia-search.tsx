// components/Search.js
import { InstantSearch, Configure, SearchBox, Hits } from "react-instantsearch";
import algoliasearch from "algoliasearch/lite";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { useConfig } from "../contexts";
import { remark } from "remark";
import remarkHTML from "remark-html";
import React from "react";
import type { Item as NormalItem } from "nextra/normalize-pages";

type MyItem = NormalItem & {
  // Add or modify properties as needed
  tags?: string[];
};
// Search API key and application ID below
const searchClient = algoliasearch(
  "J27DIPDG4S",
  "601cad4cf7041d99c1bdf42f4d4843d6",
);
const indexName = "14-3-24-index";

// Function to convert Markdown to HTML
const markdownToHTML = (markdownString) => {
  return remark().use(remarkHTML).processSync(markdownString).toString();
};

export const InstantAlgoliaSearch = ({
  directories,
}: {
  directories: MyItem[];
}) => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  function Hit({ hit }) {
    if (show) {
      const x = (
        <div
          className="nx-w-64 nx-h-32 nx-absolute nx-bg-gray-100 nx-border-b-2 nx-rounded nx-right-0"
          onClick={() => {
            router.push(hit.path);
          }}
        >
          <div className="nx-text-lg nx-p-2">{hit.title.replaceAll("#", "")}</div>
          <div className="nx-text-sm nx-p-2 nx-text-gray-700">{hit.content.substring(0, 160)}</div>
          <div className="nx-text-lg nx-p-2">{hit.path.replaceAll("/", ">").replace(">docs>", "")}</div>
        </div>
      );
      return x;
    } else {
      return null
    }
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
      <div style={{width : "100%"}}>
    <InstantSearch searchClient={searchClient} indexName={indexName} >
      <div
        className=""
        style={{ right: "120px" }}
        ref={dropdownRef}
      >
        <Configure hitsPerPage={4} />
        <SearchBox queryHook={queryHook}
                   placeholder="Search..."
         classNames={{
            input: 'nx-w-full nx-bg-gray-50 nx-border nx-border-gray-300 nx-text-gray-900 nx-text-lg nx-p-2 nx-rounded-lg nx-focus:ring-blue-500 nx-focus:border-blue-500 nx-block  nx-p-2.5 nx-dark:bg-gray-700 nx-dark:border-gray-600 nx-dark:placeholder-gray-400 nx-dark:text-white nx-dark:focus:ring-blue-500 nx-dark:focus:border-blue-500',
           submit: 'nx-hidden',
           reset : 'nx-hidden'
        }}/>
        <Hits hitComponent={Hit} />
      </div>
    </InstantSearch>
      </div>
  );
};
