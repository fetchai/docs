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
    const r = JSON.stringify(hit);
    if (show) {
      const x = (
        <div
          className="nx-w-64 nx-h-32 overflow-y-auto"
          onClick={() => {
            router.push(hit.path);
          }}
        >
          <div>{hit.title}</div>
          <div>{hit.content}</div>
          <div>{hit.path}</div>
        </div>
      );
      return x;
    } else {
      return <div></div>;
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
    <InstantSearch searchClient={searchClient} indexName={indexName}>
      <div
        className="nx-absolute nx-right-32"
        style={{ right: "120px" }}
        ref={dropdownRef}
      >
        <Configure hitsPerPage={1} />
        <SearchBox queryHook={queryHook} placeholder="Search..." />
        <Hits hitComponent={Hit} />
      </div>
    </InstantSearch>
  );
};
