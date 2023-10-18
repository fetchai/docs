import { useRouter } from "next/router";
import type { NextraThemeLayoutProps, PageOpts } from "nextra";
import type { ReactElement, ReactNode } from "react";
import { useMemo } from "react";
import "focus-visible";
import cn from "clsx";
import { useFSRoute, useMounted } from "nextra/hooks";
import { MDXProvider } from "nextra/mdx";
import "./polyfill";
import type { PageTheme } from "nextra/normalize-pages";
import { normalizePages } from "nextra/normalize-pages";
import {
  Banner,
  Breadcrumb,
  Head,
  NavLinks,
  Sidebar,
  SkipNavContent,
} from "./components";
import { DEFAULT_LOCALE } from "./constants";
import { ActiveAnchorProvider, ConfigProvider, useConfig } from "./contexts";
import { getComponents } from "./mdx-components";
import { renderComponent } from "./utils";
import React from "react";

interface BodyProps {
  themeContext: PageTheme;
  breadcrumb: ReactNode;
  timestamp?: number;
  navigation: ReactNode;
  tags: string[] | null;
  children: ReactNode;
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
}: BodyProps): ReactElement => {
  const config = useConfig();
  const mounted = useMounted();

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

  const tagColors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-purple",
    "bg-green",
    "bg-orange",
    "bg-pink",
    "bg-teal",
  ];
  const tagsComponent = tags && (
    <div className="nx-mt-10 nx-mb-8 flex flex-wrap nx-gap-4">
      {tags.map((tag, index) => (
        <span
          key={index}
          className={`nx-text-white nx-text-sm nx-font-medium nx-rounded-xxl nx-px-4 nx-py-2 nx-mr-2 nx-mb-2 nx-${
            tagColors[index % tagColors.length]
          }`}
        >
          {tag}
        </span>
      ))}
    </div>
  );

  const content = (
    <>
      {tagsComponent}
      {children}
      {gitTimestampEl}
      {navigation}
    </>
  );

  const body = config.main?.({ children: content }) || content;

  if (themeContext.layout === "full") {
    return (
      <article
        className={cn(
          classes.main,
          "nextra-content nx-min-h-[calc(100vh-var(--nextra-navbar-height))] nx-pl-[max(env(safe-area-inset-left),1.5rem)] nx-pr-[max(env(safe-area-inset-right),1.5rem)]",
        )}
      >
        {body}
      </article>
    );
  }

  return (
    <article
      className={cn(
        classes.main,
        "nextra-content nx-flex nx-min-h-[calc(100vh-var(--nextra-navbar-height))] nx-min-w-0 nx-justify-center nx-pb-8 nx-pr-[calc(env(safe-area-inset-right)-1.5rem)]",
        themeContext.typesetting === "article" &&
          "nextra-body-typesetting-article",
      )}
    >
      <main className="nx-w-full nx-min-w-0 nx-max-w-6xl nx-px-6 nx-pt-4 md:nx-px-12">
        {breadcrumb}
        {body}
      </main>
    </article>
  );
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

  const {
    activeType,
    activeIndex,
    activeThemeContext,
    activePath,
    docsDirectories,
    flatDirectories,
    flatDocsDirectories,
    directories,
  } = useMemo(
    () =>
      normalizePages({
        list: pageMap,
        locale,
        defaultLocale,
        route: fsPath,
      }),
    [pageMap, locale, defaultLocale, fsPath],
  );

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
    <div dir={direction}>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.setAttribute('dir','${direction}')`,
        }}
      />
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-PRBVQNSV"
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
      {themeContext.navbar &&
        renderComponent(config.navbar.component, {
          flatDirectories,
          items: docsDirectories,
        })}
      <div
        className={cn(
          "nx-mx-auto nx-flex",
          themeContext.layout !== "raw" && "nx-max-w-[90rem]",
        )}
      >
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
            tags={
              activePath[activePath.length - 1].tags
                ? activePath[activePath.length - 1].tags
                : null
            }
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
    <ConfigProvider value={context}>
      <InnerLayout {...context.pageOpts}>{children}</InnerLayout>
    </ConfigProvider>
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
