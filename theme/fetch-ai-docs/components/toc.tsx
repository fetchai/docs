import cn from "clsx";
import type { ReactElement } from "react";
import { useEffect, useMemo, useRef } from "react";
import scrollIntoView from "scroll-into-view-if-needed";
import { useActiveAnchor, useConfig } from "../contexts";
import { renderComponent } from "../utils";
import React from "react";

interface HeadingProps {
  depth: number;
  value: string;
  id: string;
  isActive: boolean;
}

export type TOCProps = {
  headings: HeadingProps[];
  filePath: string;
};

const linkClassName = cn(
  "nx-text-xs nx-font-medium nx-text-gray-500 hover:nx-text-gray-900 dark:nx-text-gray-400 dark:hover:nx-text-gray-100",
  "contrast-more:nx-text-gray-800 contrast-more:dark:nx-text-gray-50",
);

export function TOC({ headings, filePath }: TOCProps): ReactElement {
  const activeAnchor = useActiveAnchor();
  const config = useConfig();
  const tocRef = useRef<HTMLDivElement>(null);

  const items = useMemo(
    () => headings?.filter((heading) => heading?.depth > 1),
    [headings],
  );

  const hasHeadings = items?.length > 0;
  const hasMetaInfo = Boolean(
    config.feedback.content ||
      config.editLink.component ||
      config.toc.extraContent,
  );

  const activeSlug = Object.entries(activeAnchor).find(
    ([, { isActive }]) => isActive,
  )?.[0];

  useEffect(() => {
    if (!activeSlug) return;
    const anchor = tocRef.current?.querySelector(
      `li > a[href="#${activeSlug}"]`,
    );

    if (anchor) {
      scrollIntoView(anchor, {
        behavior: "smooth",
        block: "center",
        inline: "center",
        scrollMode: "always",
        boundary: tocRef.current,
      });
    }
  }, [activeSlug]);

  return (
    <div
      ref={tocRef}
      className={cn(
        "nextra-scrollbar no-scrollbar hide-toc  nx-top-16 nx-w-full nextra-toc-container nx-sticky nx-overflow-y-auto nx-text-sm [hyphens:auto]",
        "nx-max-h-[calc(100vh-var(--nextra-navbar-height)-env(safe-area-inset-bottom))] rtl:-nx-ml-4",
      )}
    >
      {hasHeadings && (
        <>
          <p className="first-title">{config.toc.title}</p>
          <ul>
            {items.map(({ id, value, depth }) => (
              <li className="nx-my-2 nx-scroll-my-6 nx-scroll-py-6" key={id}>
                <a
                  href={`#${id}`}
                  className={cn(
                    {
                      2: "nextra-toc-title",
                      3: "ltr:nx-pl-4 rtl:nx-pr-4",
                      4: "ltr:nx-pl-8 rtl:nx-pr-8",
                      5: "ltr:nx-pl-12 rtl:nx-pr-12",
                      6: "ltr:nx-pl-16 rtl:nx-pr-16",
                    }[depth as Exclude<typeof depth, 1>],
                    "nx-inline-block",
                    activeAnchor[id]?.isActive
                      ? "active-toc nx-subpixel-antialiased contrast-more:!nx-text-primary-600"
                      : "fetch-navy-toc hover:nx-text-primary-600 dark:nx-text-gray-400 dark:hover:nx-text-gray-300",
                    "contrast-more:nx-text-gray-900 contrast-more:nx-underline contrast-more:dark:nx-text-gray-50 nx-w-full nx-break-words",
                  )}
                >
                  {config.toc.headingComponent?.({
                    id,
                    children: value,
                  }) ?? value}
                </a>
              </li>
            ))}
            {hasMetaInfo && (
              <div
                className={cn(
                  hasHeadings &&
                    "nx-border-t nx-bg-white nx-pt-4 nx-shadow-[0_-12px_16px_white] dark:nx-bg-dark dark:nx-shadow-[0_-12px_16px_#111]",
                  "nx-sticky nx-bottom-0 nx-flex nx-flex-col nx-items-start nx-gap-2 nx-pb-8 dark:nx-border-neutral-800",
                  "contrast-more:nx-border-t contrast-more:nx-border-neutral-400 contrast-more:nx-shadow-none contrast-more:dark:nx-border-neutral-400",
                )}
              >
                {renderComponent(config.editLink.component, {
                  filePath,
                  className: linkClassName,
                  children: renderComponent(config.editLink.text),
                })}
                {renderComponent(config.toc.extraContent)}
              </div>
            )}
          </ul>
        </>
      )}
    </div>
  );
}
