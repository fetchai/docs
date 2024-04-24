import { useRouter } from "next/router";
import type { NextraThemeLayoutProps, PageOpts } from "nextra";
import type { ReactElement, ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import "focus-visible";
import cn from "clsx";
import { useFSRoute, useMounted } from "nextra/hooks";
import { MDXProvider } from "nextra/mdx";
import "./polyfill";
import type { PageTheme } from "nextra/normalize-pages";
import { normalizePages } from "nextra/normalize-pages";
import { ErrorBoundary } from "react-error-boundary";
import { motion } from "framer-motion";
import {
  Banner,
  Breadcrumb,
  Head,
  MatchingRoutesComponent,
  NavLinks,
  Progressbar,
  Sidebar,
  SkipNavContent,
} from "./components";
import { DEFAULT_LOCALE } from "./constants";
import { ActiveAnchorProvider, ConfigProvider, useConfig } from "./contexts";
import { getComponents } from "./mdx-components";
import { renderComponent } from "./utils";
import React from "react";
import FeedbackComponent from "components/feedback";
import type { Item } from "nextra/normalize-pages";
import { setCookie } from "cookies-next";
import { UserInfoProvider, useUserContext } from "./contexts/context-provider";
import Bookmark from "./components/bookmark";
import useBookMark from "theme/use-book-mark";
import { isLinkInResponse } from "./helpers";
import useContentVisited from "theme/use-content-visited";

type MyItem = Item & {
  // Add or modify properties as needed
  tags?: string[];
  permission: string[];
};

interface BodyProps {
  themeContext: PageTheme;
  breadcrumb: ReactNode;
  timestamp?: number;
  navigation: ReactNode;
  tags: string[] | null;
  children: ReactNode;
  onClickBookMark: (val: boolean) => void;
  bookMark: boolean;
  directoriesWithTags: {
    route: string;
    tags: string[];
  }[];
}

const classes = {
  toc: cn(
    "nextra-toc nx-order-last nx-hidden nx-w-64 nx-shrink-0 xl:nx-block print:nx-hidden",
  ),
  main: cn("nx-w-full nx-break-words"),
};

const Body = ({
  themeContext,
  breadcrumb,
  timestamp,
  navigation,
  tags,
  children,
  bookMark,
  onClickBookMark,
  directoriesWithTags,
}: BodyProps): ReactElement => {
  const config = useConfig();
  const mounted = useMounted();
  const [matchingTagRoute, setMatchingTagRoute] =
    useState<{ route: string; tags: string[] }[]>();

  useEffect(() => {
    setMatchingTagRoute(null);
  }, [tags]);

  if (themeContext.layout === "raw") {
    return <div className={classes.main}>{children}</div>;
  }
  const date =
    themeContext.timestamp && config.gitTimestamp && timestamp
      ? new Date(timestamp)
      : null;

  const gitTimestampEl =
    // Because a user's time zone may be different from the server page
    mounted && date ? (
      <div className="nx-mt-12 nx-mb-8 nx-block nx-text-xs nx-text-gray-500 ltr:nx-text-right rtl:nx-text-left dark:nx-text-gray-400">
        {renderComponent(config.gitTimestamp, { timestamp: date })}
      </div>
    ) : (
      <div className="nx-mt-16" />
    );

  const handleTagClick = (tag: string) => {
    const filteredRoutes = directoriesWithTags.filter((directory) =>
      directory.tags.includes(tag),
    );
    setMatchingTagRoute(filteredRoutes);
  };

  const tagColors = [
    "bg-indigo",
    "bg-orange",
    "bg-light-green",
    "bg-blue-150",
    "bg-yellow-150",
    "bg-red-150",
  ];
  const tagsComponent = tags && (
    <div className="nx-mt-4 nx-mb-4 nx-flex nx-flex-wrap nx-gap-2 nx-max-w-50rem">
      {tags.map((tag, index) => (
        <span
          key={index}
          className={`nx-text-fetch-main nx-text-sm nx-font-normal nx-rounded nx-px-4 nx-py-2 nx-${
            tagColors[index % tagColors.length]
          }`}
        >
          <button onClick={() => handleTagClick(tag)}>{tag}</button>
        </span>
      ))}
    </div>
  );

  const routeOriginal = useFSRoute();
  const [route] = routeOriginal.split("#");
  const content = (
    <>
      {tagsComponent}
      {matchingTagRoute ? (
        <MatchingRoutesComponent routes={matchingTagRoute} />
      ) : (
        ""
      )}
      {children}
      {gitTimestampEl}
      {themeContext.timestamp && (
        <div className="nx-flex nx-justify-center nx-mb-6">
          <FeedbackComponent pageUrl={route} />
        </div>
      )}
      {navigation}
    </>
  );

  const body = config.main?.({ children: content }) || content;
  if (themeContext.layout === "full") {
    return (
      <>
        <article
          className={cn(
            classes.main,
            "nextra-content nx-min-h-[calc(100vh-var(--nextra-navbar-height))] nx-pl-[max(env(safe-area-inset-left),1.5rem)] nx-pr-[max(env(safe-area-inset-right),1.5rem)]",
          )}
        >
          {body}
        </article>
      </>
    );
  }

  return (
    <>
      <article
        className={cn(
          classes.main,
          "nextra-content nx-flex nx-min-h-[calc(100vh-var(--nextra-navbar-height))] nx-min-w-0 nx-pb-8 nx-pr-[calc(env(safe-area-inset-right)-1.5rem)]",
          themeContext.typesetting === "article" &&
            "nextra-body-typesetting-article",
        )}
      >
        <main className="nx-w-full nx-min-w-0 nx-max-w-6xl nx-px-6 nx-pt-4 md:nx-px-12">
          {breadcrumb}
          <Bookmark
            classes="bookMarkMobile"
            bookMark={bookMark}
            onClickBookMark={onClickBookMark}
          />
          {body}
        </main>
      </article>
      <div>
        <Bookmark
          classes="bookMarkDesktop"
          bookMark={bookMark}
          onClickBookMark={onClickBookMark}
        />
      </div>
    </>
  );
};

const setLastVisitedTimestamp = () => {
  const now = new Date();
  setCookie("lastVisitedTimestamp", now.toISOString());
};

const InnerLayout = ({
  pageMap,
  frontMatter,
  headings,
  timestamp,
  children,
}: PageOpts & { children: ReactNode }): ReactElement => {
  const context = useUserContext();
  const {
    state: { bookMarks, bookMarkSuccess },
    action: { onClickBookMark, fetchBookMarks },
  } = useBookMark(context);
  const {
    state: { contentVisited },
    action: { onClickSetContentVisited, fetchContentVisited },
  } = useContentVisited(context);
  const config = useConfig();
  const { locale = DEFAULT_LOCALE, defaultLocale } = useRouter();
  const fsPath = useFSRoute();
  const bookMark = isLinkInResponse(bookMarks);

  useEffect(() => {
    setLastVisitedTimestamp();
  }, []);

  const {
    activeType,
    activeIndex,
    activeThemeContext,
    activePath,
    docsDirectories,
    flatDirectories,
    flatDocsDirectories,
    directories,
  } = useMemo(() => {
    const normalized = normalizePages({
      list: pageMap,
      locale,
      defaultLocale,
      route: fsPath,
    });

    // Assuming activePath needs to be converted to MyItem[]
    const myActivePath: MyItem[] = normalized.activePath.map((item) => {
      // You may need to perform additional conversions here
      return item as MyItem;
    });

    return {
      activeType: normalized.activeType,
      activeIndex: normalized.activeIndex,
      activeThemeContext: normalized.activeThemeContext,
      activePath: myActivePath,
      docsDirectories: normalized.docsDirectories,
      flatDirectories: normalized.flatDirectories,
      flatDocsDirectories: normalized.flatDocsDirectories,
      directories: normalized.directories,
      topLevelNavbarItems: normalized.topLevelNavbarItems,
    };
  }, [pageMap, locale, defaultLocale, fsPath]);

  const directoriesWithTags = (flatDirectories as MyItem[])
    .filter((directory) => !!("tags" in directory))
    .map(({ route, tags }) => ({ route, tags }));

  const themeContext = { ...activeThemeContext, ...frontMatter };
  const hideSidebar =
    !themeContext.sidebar ||
    themeContext.layout === "raw" ||
    activeType === "page";

  const localeConfig = config.i18n.find((l) => l.locale === locale);
  const isRTL = localeConfig
    ? localeConfig.direction === "rtl"
    : config.direction === "rtl";
  const direction = isRTL ? "rtl" : "ltr";

  const check = activePath.at(-1)?.permission?.length
    ? activePath.at(-1)?.permission.includes("fetch.ai") &&
      context.isFetchAccount
    : true;
  return (
    // This makes sure that selectors like `[dir=ltr] .nextra-container` work
    // before hydration as Tailwind expects the `dir` attribute to exist on the
    // `html` element.
    <div dir={direction}>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.setAttribute('dir','${direction}')`,
        }}
      />
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-MVT793SR"
          height="0"
          width="0"
          className="nextra-iframe-google-tag"
        ></iframe>
      </noscript>
      <link
        href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <Head />
      <Banner />
      <Progressbar />
      {themeContext.navbar &&
        renderComponent(config.navbar.component, {
          flatDirectories,
          items: docsDirectories,
          bookMark,
          fetchBookMarks,
        })}
      <div className="nx-mx-auto nx-flex">
        <ActiveAnchorProvider>
          <Sidebar
            docsDirectories={docsDirectories}
            flatDirectories={flatDirectories}
            fullDirectories={directories}
            headings={headings}
            asPopover={hideSidebar}
            includePlaceholder={themeContext.layout === "default"}
            contentVisited={contentVisited}
            fetchContentVisited={fetchContentVisited}
          />
          <SkipNavContent />
          {bookMarkSuccess && Toast(bookMarkSuccess)}
          {check && (
            <Body
              themeContext={themeContext}
              breadcrumb={
                activeType !== "page" && themeContext.breadcrumb ? (
                  <Breadcrumb activePath={activePath} />
                ) : null
              }
              timestamp={timestamp}
              navigation={
                activeType !== "page" && themeContext.pagination ? (
                  <NavLinks
                    flatDirectories={flatDocsDirectories}
                    currentIndex={activeIndex}
                    onClickSetContentVisited={onClickSetContentVisited}
                    fetchedContentVisited={contentVisited}
                  />
                ) : null
              }
              tags={activePath.at(-1)?.tags ?? undefined}
              onClickBookMark={onClickBookMark}
              bookMark={bookMark}
              directoriesWithTags={directoriesWithTags}
            >
              <MDXProvider
                components={getComponents({
                  isRawLayout: themeContext.layout === "raw",
                  components: config.components,
                })}
              >
                {children}
              </MDXProvider>
            </Body>
          )}
        </ActiveAnchorProvider>
      </div>
      {themeContext.footer &&
        renderComponent(config.footer.component, { menu: hideSidebar })}
    </div>
  );
};

const Toast = (bookMarkSuccess: string) => (
  <motion.div
    initial={{ x: 200 }}
    animate={{ x: 0 }}
    transition={{
      delay: 0,
      ease: "easeInOut",
      duration: 0.1,
    }}
    id="nx-toast-success"
    className="nx-flex nx-fixed nx-bottom-0 nx-right-0 nx-w-[270px] nx-items-center nx-p-4 nx-mb-4 nx-text-gray-500 nx-bg-white nx-rounded-lg nx-shadow"
    role="alert"
  >
    <div className="nx-inline-flex nx-items-center nx-justify-center nx-flex-shrink-0 nx-w-8 nx-h-8 nx-text-gray-500 nx-bg-white nx-rounded-lg">
      <svg
        className="nx-w-5 nx-h-5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
      </svg>
      <span className="nx-sr-only">Check icon</span>
    </div>
    <div className="nx-ms-3 nx-text-sm nx-font-normal">{bookMarkSuccess}</div>
  </motion.div>
);

const Error = () => (
  <div className="nx-flex nx-justify-center  nx-items-center nx-mt-[35vh]">
    <div className="nx-flex nx-p-[32px] nx-gap-8 nx-flex-col gap-[32px] nx-rounded-[12px]">
      <div className="nx-flex nx-gap-2 nx-flex-col nx-justify-start nx-items-start">
        <span className="nx-font-normal nx-text-slate-900 nx-text-5xl">
          Something went wrong!
        </span>
        <span className=" nx-font-normal nx-text-[20px] nx-tracking-[-.2px] nx-opacity-90 nx-text-[#0B1742]">
          Sorry, we are currently experiencing some trouble.
        </span>
        <span className="nx-font-normal nx-leading-5 nx-text-[14px]  nx-opacity-60 nx-text-[#000D3D]">
          Right this moment, Agents are figuring out the fix.
        </span>
      </div>
      <div>
        <button
          onClick={() => window.location.reload()}
          className="nx-bg-[#5F38FB] nx-rounded-md nx-text-[14px] nx-px-4 nx-py-2 nx-text-white"
        >
          Refresh page
        </button>
      </div>
    </div>
  </div>
);

export default function Layout({
  children,
  ...context
}: NextraThemeLayoutProps): ReactElement {
  return (
    <ErrorBoundary FallbackComponent={Error}>
      <UserInfoProvider>
        <ConfigProvider value={context}>
          <InnerLayout {...context.pageOpts}>{children}</InnerLayout>
        </ConfigProvider>
      </UserInfoProvider>
    </ErrorBoundary>
  );
}

export { useMDXComponents } from "nextra/mdx";
export {
  Callout,
  Steps,
  Tabs,
  Tab,
  Cards,
  Card,
  FileTree,
} from "nextra/components";
export { useTheme } from "next-themes";
export { Link } from "./mdx-components";
export {
  Collapse,
  NotFoundPage,
  ServerSideErrorPage,
  Navbar,
  SkipNavContent,
  SkipNavLink,
  ThemeSwitch,
} from "./components";

export { useConfig } from "./contexts";
export { type PartialDocsThemeConfig as DocsThemeConfig } from "./constants";
