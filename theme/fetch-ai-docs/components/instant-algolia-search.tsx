// components/Search.js
import {
  InstantSearch,
  Configure,
  connectSearchBox,
  connectHits,
} from "react-instantsearch-dom";
import algoliasearch from "algoliasearch/lite";
// import { useRouter } from "next/router"
import { useCallback, useEffect, useRef, useState } from "react";
import { MDXProvider } from "nextra/mdx";
import { getComponents } from "../mdx-components";
import { useConfig } from "../contexts";
import { remark } from "remark";
import remarkHTML from "remark-html";
import React from "react";

// Replace with your Algolia credentials
const searchClient = algoliasearch(
  "13E7QJOAO8",
  "f44d72000628d2f2015a86151815153a",
);
const indexName = "first_index";

// Function to convert Markdown to HTML
const markdownToHTML = (markdownString) => {
  return remark().use(remarkHTML).processSync(markdownString).toString();
};

export const InstantAlgoliaSearch = () => {
  const config = useConfig();
  // const router = useRouter()
  const [show, setShow] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // const [searchValue, setSearchValue] = useState("")

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

  // Add click event listener when the component mounts
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);

  // useEffect(() => {
  //   const handleRouteChange = async (url) => {
  //     if (searchValue !== "") {
  //       try {
  //         const response = await fetch(
  //           "https://profilio-staging.sandbox-london-b.fetch-ai.com/api/search",
  //           {
  //             method: "POST",
  //             headers: {
  //               "Content-Type": "application/json",
  //             },
  //             body: JSON.stringify({
  //               search_term: searchValue,
  //               selected_path: url,
  //             }),
  //           },
  //         )

  //         if (!response.ok) {
  //           console.log("---something went wrong----")
  //         }
  //       } catch (error) {
  //         // Handle errors
  //         console.log("---oops, something went wrong----", error)
  //       }
  //     }
  //   }
  //   router.events.on("routeChangeStart", handleRouteChange)

  //   // If the component is unmounted, unsubscribe
  //   // from the event with the `off` method:
  //   return () => {
  //     router.events.off("routeChangeStart", handleRouteChange)
  //   }
  // }, [router, searchValue])

  // Custom SearchBox component with a controlled input
  const SearchBox = connectSearchBox(({ currentRefinement, refine }) => (
    <input
      type="search"
      value={currentRefinement}
      onChange={(event) => {
        setShow(true);
        refine(event.currentTarget.value);
      }}
      onFocus={() => {
        setShow(true);
      }}
      placeholder="Search..."
      className="nx-rounded-xxl nx-border-purple nx-border nx-w-full nx-h-full nx-p-4"
    />
  ));

  // Custom Hits component to render search results
  const CustomHits = connectHits(({ hits }) => {
    const groupedHits = {};

    // Group hits by route
    for (const hit of hits) {
      const route = hit.path.split("#")[0];

      if (!groupedHits[route]) {
        groupedHits[route] = [];
      }

      groupedHits[route].push(hit);
    }

    return (
      show && (
        <div className="nextra-scrollbar nx-border nx-border-gray-200 nx-bg-white dark:nx-border-neutral-800 dark:nx-bg-neutral-900 nx-absolute nx-top-full nx-z-20 nx-mt-2 nx-overflow-auto nx-overscroll-contain nx-rounded-xl nx-py-2.5 nx-shadow-xl nx-max-h-[min(calc(50vh-11rem-env(safe-area-inset-bottom)),400px)] md:nx-max-h-[min(calc(100vh-5rem-env(safe-area-inset-bottom)),400px)] nx-inset-x-0 ltr:md:nx-left-auto rtl:md:nx-right-auto contrast-more:nx-border contrast-more:nx-border-gray-900 contrast-more:dark:nx-border-gray-50 nx-max-w-full">
          {Object.entries(groupedHits).map(([route, hitsForRoute]) => (
            <div key={route} onClick={() => setShow(false)}>
              <div className="nx-py-2 nx-bg-grey-200 nx-text-sm nx-text-grey-600 nx-font-semibold nx-tracking-loose nx-uppercase">
                <span className="nx-block nx-px-4 nx-text-sm">
                  <div className="nx-my-1">{route.split("/").pop()}</div>
                </span>
              </div>

              <ul role="listbox" aria-labelledby="search-label">
                {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (hitsForRoute as any[]).map((hit) => (
                    <li
                      role="option"
                      aria-selected="false"
                      className="nx-relative nx-border-grey-200 nx-bg-search-result"
                      key={hit.objectId}
                    >
                      <a
                        className="nx-flex nx-justify-between nx-items-center nx-leading-normal nx-py-2 nx-px-6 nx-transition-colors nx-duration-5 nx-ease-out nx-overflow-hidden nx-text-grey-900 nx-bg-transparent"
                        href={hit.path}
                      >
                        <div className="nx-flex nx-flex-col nx-relative w-full">
                          <div className="nx-text-base nx-font-semibold nx-text-fetch-main">
                            {hit.title.replaceAll("#", "")}
                          </div>

                          <div className="nx-relative w-full nx-text-sm nx-leading-tight nx-mt-4 nx-xl:mt-2 nx-mb-2">
                            <MDXProvider
                              components={getComponents({
                                isRawLayout: false,
                                components: config.components,
                              })}
                            >
                              <div
                                className="nx-flex-grow-1 nx-text-fetch-content nx-font-normal nx-text-fetch-main nx-text-sm"
                                dangerouslySetInnerHTML={{
                                  __html: markdownToHTML(hit.content).slice(
                                    0,
                                    2000,
                                  ),
                                }}
                              />
                            </MDXProvider>
                          </div>
                          <div className="nx-text-sm nx-text-grey-600">
                            {hit.path
                              .replace(/^\/docs\//, "")
                              .split("/")
                              .join(" > ")}
                          </div>
                        </div>
                      </a>
                      <div className="nx-border-b" />
                    </li>
                  ))
                }
              </ul>
            </div>
          ))}
        </div>
      )
    );
  });

  return (
    <InstantSearch searchClient={searchClient} indexName={indexName}>
      <div
        className="nextra-search nx-relative nx-footer-width-50 nx-mr-4"
        ref={dropdownRef}
      >
        <Configure hitsPerPage={10} />
        <SearchBox />
        <CustomHits />
      </div>
    </InstantSearch>
  );
};
