import React, { useState, useRef, useEffect } from "react";
import {
  InstantSearch,
  Configure,
  connectSearchBox,
  connectHits,
} from "react-instantsearch-dom";
import algoliasearch from "algoliasearch/lite";
import { useRouter } from "next/router";
import { MDXProvider } from "nextra/mdx";
import { getComponents } from "../mdx-components";
import { useConfig } from "../contexts";
import { remark } from "remark";
import remarkHTML from "remark-html";
import type { Item as NormalItem } from "nextra/normalize-pages";
import { Input } from "./input";
import Modal from "./search-model";
import { DarkShortcut, Shortcut } from "src/icons/shared-icons";
import { useTheme } from "next-themes";
import { ThemeMode } from "../helpers";

type MyItem = NormalItem & {
  tags?: string[];
};

const searchClient = algoliasearch(
  `4MNO2TMYQ5`, //4MNO2TMYQ5
  `79f05f43517b76c1b8af1c6c667dbaba`,
);
const indexName = `Fetch ai Docs`;

const markdownToHTML = (markdownString) => {
  return remark().use(remarkHTML).processSync(markdownString).toString();
};

export const InstantAlgoliaSearch = ({
  directories,
}: {
  directories: MyItem[];
}) => {
  const config = useConfig();
  const router = useRouter();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const inputRef = useRef(null);
  const modalInputRef = useRef(null);
  const { resolvedTheme } = useTheme();
  const onClickSearchResult = async (path) => {
    const searchInput =
      document.querySelector<HTMLInputElement>("#search-input");
    const searchValue = searchInput ? searchInput.value : "";

    if (searchValue !== "") {
      try {
        const response = await fetch(`/docs/api/search`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            search_term: searchValue,
            selected_path: path,
          }),
        });
        if (!response.ok) {
          console.log("---something went wrong----");
        }
      } catch (error) {
        console.log("---oops, something went wrong----", error);
      }
    }

    // const actualPath = path.split("/docs")[1];
    router.push(path);
    setModalIsOpen(false);
  };

  const mainInputId = "modal-search-input";

  const SearchBox = connectSearchBox(({ currentRefinement, refine }) => (
    <div className="nx-flex nx-items-center nx-justify-between nx-mr-4 nx-gap-4">
      <div className="nx-flex-basis-input">
        <Input
          id={mainInputId}
          type="search"
          value={currentRefinement}
          onChange={(event) => refine(event.currentTarget.value)}
          placeholder="Search in documentation"
          className="main-search-bar dark:nx-bg-dark-main"
          autoComplete="off"
          ref={modalInputRef}
        />
      </div>
      <div
        onClick={() => setModalIsOpen(false)}
        className="nx-text-sm nx-cursor-pointer nx-text-gray-500 nx-p-2 nx-rounded-lg esc-bg"
      >
        Esc
      </div>
    </div>
  ));

  const NoResultsBoundary = ({ fallback }: { fallback: string }) => {
    return (
      <div className="nx-mt-2 nx-absolute nx-w-full nx-h-full">
        <div className="nx-flex nx-p-4 nx-font-normal nx-justify-center">{`${fallback}`}</div>
      </div>
    );
  };

  const CustomHits = connectHits(({ hits }) => {
    if (hits.length <= 0) {
      return <NoResultsBoundary fallback={"No more information available !"} />;
    }

    return (
      <div className="nextra-scrollbar nx-w-full nx-border nx-border-gray-200 nx-bg-white dark:nx-bg-dark-main dark:nx-border-none nx-absolute nx-top-full nx-z-20 nx-mt-2 nx-overflow-auto nx-overscroll-contain nx-py-2.5 nx-shadow-xl small-screen-height  sm:nx-max-h-[min(calc(50vh-11rem-env(safe-area-inset-bottom)),400px)] md:nx-max-h-[min(calc(100vh-5rem-env(safe-area-inset-bottom)),400px)] nx-inset-x-0 ltr:md:nx-left-auto rtl:md:nx-right-auto contrast-more:nx-border contrast-more:nx-border-gray-900 contrast-more:dark:nx-border-gray-50 nx-max-w-full">
        <ul role="listbox" aria-labelledby="search-label">
          {hits.map((hit) => (
            <li
              role="option"
              aria-selected="false"
              className="nx-relative nx-border-grey-200 nx-bg-search-result nx-cursor-pointer"
              key={hit.objectId}
            >
              <div
                className="nx-flex nx-justify-between nx-items-center nx-leading-normal nx-py-2 nx-px-6 nx-transition-colors nx-duration-5 nx-ease-out nx-overflow-hidden nx-text-grey-900 nx-bg-transparent dark:nx-bg-dark-main"
                onClick={() => onClickSearchResult(hit.url)}
              >
                <div className="w-full nx-flex nx-flex-col nx-relative">
                  <div className="nx-text-base nx-font-semibold nx-text-fetch-main dark:nx-text-white-80">
                    {hit.anchor || hit.hierarchy.lvl1 || hit.hierarchy.lvl0}
                  </div>

                  {hit.content && hit.content.length > 0 && (
                    <div className="w-full nx-relative nx-text-sm nx-leading-tight nx-mt-4 nx-xl:mt-2 nx-mb-2">
                      <MDXProvider
                        components={getComponents({
                          isRawLayout: false,
                          components: config.components,
                        })}
                      >
                        <div
                          className="nx-flex-grow-1 nx-text-fetch-content nx-font-normal nx-text-fetch-main nx-text-sm dark:nx-text-white-60 dark:nx-bg-dark-main"
                          dangerouslySetInnerHTML={{
                            __html: `${markdownToHTML(hit.content).slice(
                              0,
                              500,
                            )}${hit.content.length > 500 ? "..." : ""}`,
                          }}
                        />
                      </MDXProvider>
                    </div>
                  )}
                  <div className="nx-text-sm nx-text-grey-600 dark:nx-text-indigo-250">
                    {hit.url}
                  </div>
                </div>
              </div>
              <div className="nx-border-b" />
            </li>
          ))}
        </ul>
      </div>
    );
  });

  const handleInputClick = (e) => {
    e.preventDefault();
    setModalIsOpen(true);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        (event.ctrlKey && event.key === "k") ||
        (event.metaKey && event.key === "k")
      ) {
        event.preventDefault();
        event.stopImmediatePropagation();
        setModalIsOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (modalIsOpen && modalInputRef.current) {
      modalInputRef.current.focus();
    }
  }, [modalIsOpen]);

  const inputId = "search-input";

  return (
    <InstantSearch searchClient={searchClient} indexName={indexName}>
      <div className="nextra-search nx-relative nx-mr-4">
        <Configure hitsPerPage={10} />
        <div className="nx-flex nx-gap-3 input-inner-nav input-hover nx-items-center search-bar nx-h-11 nx-bg-white">
          <Input
            id={inputId}
            type="search"
            placeholder="Search in documentation"
            className="nx-bg-white nx-w-full input-inner-nav"
            onClick={handleInputClick}
            autoComplete="off"
            ref={inputRef}
          />
          <div className="nx-p-1">
            {resolvedTheme === ThemeMode.Light ? (
              <Shortcut />
            ) : (
              <DarkShortcut />
            )}
          </div>
        </div>
      </div>
      <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        <div className="nextra-search nx-opacity-100 nx-relative">
          <SearchBox />
          <CustomHits />
        </div>
      </Modal>
    </InstantSearch>
  );
};
