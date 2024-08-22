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
import Error404 from "components/error-404";

type MyItem = Item & {
  // Add or modify properties as needed
  tags?: string[];
  permission: string[];
};

type Heading = {
  depth: number;
  value: string;
  id: string;
};

interface BodyProps {
  themeContext: PageTheme;
  breadcrumb: ReactNode;
  headings: Heading[];
  timestamp?: number;
  navigation: ReactNode;
  tags: string[] | null;
  children: ReactNode;
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
  directoriesWithTags,
  headings,
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
      <div className="nx-flex nx-text-xs nx-mt-12 nv-mb-6 nx-text-gray-500 ltr:nx-text-right rtl:nx-text-left dark:nx-text-gray-400">
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

  const structuredHeadings = headings.map((heading) => ({
    value: heading.value,
    id: heading.id,
    depth: heading.depth,
  }));

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
        <main className="nextra-body-full-container nx-flex-col">
          {breadcrumb}
          {body}
        </main>

        {themeContext.toc &&
          renderComponent(config.toc.component, {
            filePath: routeOriginal,
            headings: structuredHeadings,
          })}
      </article>
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
  const config = useConfig();
  const { locale = DEFAULT_LOCALE, defaultLocale } = useRouter();
  const fsPath = useFSRoute();

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
  return (
    // This makes sure that selectors like `[dir=ltr] .nextra-container` work
    // before hydration as Tailwind expects the `dir` attribute to exist on the
    // `html` element.
    <div id="modal-root" dir={direction}>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.setAttribute('dir','${direction}')`,
        }}
      />
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-5QDSR3CT"
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
          />
          <SkipNavContent />
          <Body
            headings={headings}
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
                />
              ) : null
            }
            tags={activePath.at(-1)?.tags ?? undefined}
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
        </ActiveAnchorProvider>
      </div>
      {themeContext.footer &&
        renderComponent(config.footer.component, { menu: hideSidebar })}
    </div>
  );
};

export default function Layout({
  children,
  ...context
}: NextraThemeLayoutProps): ReactElement {
  return (
    <ErrorBoundary FallbackComponent={Error404}>
      <ConfigProvider value={context}>
        <InnerLayout {...context.pageOpts}>{children}</InnerLayout>
      </ConfigProvider>
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
  SkipNavContent,
  SkipNavLink,
  ThemeSwitch,
} from "./components";

export { useConfig } from "./contexts";
export { type PartialDocsThemeConfig as DocsThemeConfig } from "./constants";
