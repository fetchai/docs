/* eslint-disable unicorn/no-nested-ternary */
import cn from "clsx";
import React from "react";
import { useRouter } from "next/router";
import type { Heading } from "nextra";
import { useFSRoute } from "nextra/hooks";
import { ArrowRightIcon } from "nextra/icons";
import type { Item, MenuItem, PageItem } from "nextra/normalize-pages";
import type { ReactElement } from "react";
import {
  createContext,
  memo,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import scrollIntoView from "scroll-into-view-if-needed";
import { useActiveAnchor, useConfig, useMenu } from "../contexts";
import { renderComponent } from "../utils";
import { Anchor } from "./anchor";
import { Collapse } from "./collapse";

const TreeState: Record<string, boolean> = Object.create(null);

const FocusedItemContext = createContext<null | string>(null);
const OnFocusItemContext = createContext<
  null | ((item: string | null) => unknown)
>(null);
const FolderLevelContext = createContext(0);

const Folder = memo(function FolderInner(props: FolderProps) {
  const level = useContext(FolderLevelContext);
  return (
    <FolderLevelContext.Provider value={level + 1}>
      <FolderImpl {...props} />
    </FolderLevelContext.Provider>
  );
});

const classes = {
  link: cn(
    "nx-flex nx-rounded nx-px-3 nx-py-2 nx-text-sm nx-transition-colors [word-break:break-word]",
    "nx-cursor-pointer [-webkit-tap-highlight-color:transparent] [-webkit-touch-callout:none] contrast-more:nx-border",
  ),
  inactive: cn(
    "nextra-hover",
    "dark:nx-text-white-60 dark:hover:nx-bg-primary-100/5 dark:hover:nx-text-gray-50",
    "contrast-more:nx-text-gray-900 contrast-more:dark:nx-text-gray-50",
    "contrast-more:nx-border-transparent contrast-more:hover:nx-border-gray-900 contrast-more:dark:hover:nx-border-gray-50",
  ),
  active: cn(
    "nx-font-normal nextra-active-link dark:nx-text-indigo-250",
    "contrast-more:nx-border-primary-500 contrast-more:dark:nx-border-primary-500",
  ),
  list: cn("nx-flex nx-flex-col nx-gap-2"),
  border: cn(
    "nx-relative before:nx-absolute before:nx-inset-y-1",
    'before:nx-w-px  before:nx-content-[""] dark:before:nx-bg-neutral-800',
    "ltr:nx-pl-3 ltr:before:nx-left-0 rtl:nx-pr-3 rtl:before:nx-right-0",
  ),
};

type FolderProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: any;
  anchors: Heading[];
};

function FolderImpl({ item, anchors }: FolderProps): ReactElement {
  const routeOriginal = useFSRoute();
  const [route] = routeOriginal.split("#");
  const active = [route, route + "/"].includes(item.route + "/");
  const activeRouteInside = active || route.startsWith(item.route + "/");

  const parentLevelRoute = route.split("/");
  const currentItemParentRoute = item.route.split("/");

  const focusedRoute = useContext(FocusedItemContext);
  const focusedRouteInside = !!focusedRoute?.startsWith(item.route + "/");
  const level = useContext(FolderLevelContext);

  const { setMenu } = useMenu();
  const config = useConfig();
  const { theme } = item as Item;
  const open =
    TreeState[item.route] === undefined
      ? active ||
        activeRouteInside ||
        focusedRouteInside ||
        (theme && "collapsed" in theme
          ? !theme.collapsed
          : level < config.sidebar.defaultMenuCollapseLevel)
      : TreeState[item.route] || focusedRouteInside;

  const rerender = useState({})[1];

  useEffect(() => {
    const updateTreeState = () => {
      if (activeRouteInside || focusedRouteInside) {
        TreeState[item.route] = true;
      }
    };
    const updateAndPruneTreeState = () => {
      if (activeRouteInside && focusedRouteInside) {
        TreeState[item.route] = true;
      } else {
        delete TreeState[item.route];
      }
    };
    config.sidebar.autoCollapse ? updateAndPruneTreeState() : updateTreeState();
  }, [
    activeRouteInside,
    focusedRouteInside,
    item.route,
    config.sidebar.autoCollapse,
  ]);

  if (item.type === "menu") {
    const menu = item as MenuItem;
    const routes = Object.fromEntries(
      (menu.children || []).map((route) => [route.name, route]),
    );
    item.children = Object.entries(menu.items || {}).map(([key, item]) => {
      const route = routes[key] || {
        name: key,
        ...("locale" in menu && { locale: menu.locale }),
        route: menu.route + "/" + key,
      };
      return {
        ...route,
        ...item,
      };
    });
  }
  const isLink = "withIndexPage" in item && item.withIndexPage;
  const ComponentToUse = isLink ? Anchor : "button";
  if (
    currentItemParentRoute[1] == parentLevelRoute[1] ||
    (parentLevelRoute[1] == "" && level == 1)
  ) {
    return (
      <>
        <li className={cn({ open, active }, "nx-w-full")}>
          <ComponentToUse
            id={`sidebar${item.route?.split("/").join("-").toLowerCase()}`}
            href={isLink ? item.route : undefined}
            className={cn(
              "nx-items-center  nx-w-full nx-justify-between nx-gap-2",
              isLink ? "first-title" : "nx-text-left nx-w-full",
              classes.link,
              active ? classes.active : classes.inactive,
              activeRouteInside ? "nextra-active-route" : "",
            )}
            onClick={(e) => {
              const clickedToggleIcon = ["svg", "path"].includes(
                (e.target as HTMLElement).tagName.toLowerCase(),
              );
              if (clickedToggleIcon) {
                e.preventDefault();
              }
              if (isLink) {
                if (active || clickedToggleIcon) {
                  TreeState[item.route] = !open;
                } else {
                  TreeState[item.route] = true;
                  setMenu(false);
                }
                rerender({});
                return;
              }
              if (active) return;
              TreeState[item.route] = !open;
              rerender({});
            }}
          >
            {renderComponent(config.sidebar.titleComponent, {
              title: item.title,
              type: item.type,
              route: item.route,
            })}
            {!config.sidebar.autoCollapse && !isLink && (
              <ArrowRightIcon
                className="nx-h-[18px] nx-min-w-[18px] nx-rounded-sm nx-p-0.5 hover:nx-bg-gray-800/5 dark:hover:nx-bg-gray-100/5"
                pathClassName={cn(
                  "nx-origin-center nx-transition-transform rtl:-nx-rotate-180",
                  open && "ltr:nx-rotate-90 rtl:nx-rotate-[-270deg]",
                )}
              />
            )}
          </ComponentToUse>
          <Collapse
            className="ltr:nx-pr-0 rtl:nx-pl-0 nx-pt-1"
            isOpen={config.sidebar.autoCollapse || open}
          >
            {Array.isArray(item.children) ? (
              <Menu
                className={cn(classes.border, "nextra-sidebar-ul")}
                directories={item.children}
                base={item.route}
                anchors={anchors}
              />
            ) : null}
          </Collapse>
        </li>
      </>
    );
  }
  return null;
}

function Separator({ title }: { title: string }): ReactElement {
  const config = useConfig();
  return (
    <li
      className={cn(
        "[word-break:break-word]",
        title
          ? "nx-mt-5 nx-mb-2 nx-px-2 nx-py-1.5 nx-text-sm nx-font-semibold nx-text-gray-900 first:nx-mt-0 dark:nx-text-gray-100"
          : "nx-my-4",
      )}
    >
      {title ? (
        renderComponent(config.sidebar.titleComponent, {
          title,
          type: "separator",
          route: "",
        })
      ) : (
        <hr className="nx-mx-2 nx-border-t nx-border-gray-200 dark:nx-border-primary-100/10" />
      )}
    </li>
  );
}

function File({
  item,
  anchors,
  filesVisited,
}: {
  item: PageItem | Item;
  anchors: Heading[];
  filesVisited: string[];
}): ReactElement {
  const route = useFSRoute();
  const onFocus = useContext(OnFocusItemContext);

  // It is possible that the item doesn't have any route - for example an external link.
  const active = item.route && [route, route + "/"].includes(item.route + "/");
  const activeAnchor = useActiveAnchor();
  const { setMenu } = useMenu();
  const config = useConfig();

  if (item.type === "separator") {
    return <Separator title={item.title} />;
  }

  return (
    <li className={cn(classes.list, { active }, "nx-w-full")}>
      <Anchor
        id={`sidebar${item.route?.split("/").join("-").toLowerCase()}`}
        href={(item as PageItem).href || item.route}
        newWindow={(item as PageItem).newWindow}
        className={cn(classes.link, active ? classes.active : classes.inactive)}
        onClick={() => {
          setMenu(false);
        }}
        onFocus={() => {
          onFocus?.(item.route);
        }}
        onBlur={() => {
          onFocus?.(null);
        }}
      >
        {renderComponent(config.sidebar.titleComponent, {
          title:
            filesVisited?.length > 0 &&
            filesVisited?.some((file) => file == item.title)
              ? `${item.title} ✅`
              : item.title,
          type: item.type,
          route: item.route,
        })}
      </Anchor>
      {active && anchors.length > 0 && (
        <ul className={cn(classes.list, classes.border, "nextra-sidebar-ul")}>
          {anchors.map(({ id, value }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={cn(
                  classes.link,
                  'nx-flex nx-gap-2 before:nx-opacity-25 before:nx-content-["#"]',
                  activeAnchor[id]?.isActive
                    ? classes.active
                    : classes.inactive,
                )}
                onClick={() => {
                  setMenu(false);
                }}
              >
                {value}
              </a>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

interface MenuProps {
  directories: PageItem[] | Item[];
  anchors: Heading[];
  filesVisited?: string[];
  base?: string;
  className?: string;
  onlyCurrentDocs?: boolean;
}

function Menu({
  directories,
  anchors,
  className,
  onlyCurrentDocs,
  filesVisited,
}: MenuProps): ReactElement {
  return (
    <ul className={cn(classes.list, className)}>
      {directories.map((item) => {
        return !onlyCurrentDocs ||
          !item.theme ||
          (item.theme && item.theme.isUnderCurrentDocsTree)
          ? item.type === "menu" ||
            (item.children && (item.children.length > 0 || !item.withIndexPage))
            ? true && <Folder key={item.name} item={item} anchors={anchors} />
            : true &&
              !item?.name?.includes("integrations") && (
                <File
                  key={item.name}
                  item={item}
                  anchors={anchors}
                  filesVisited={filesVisited}
                />
              )
          : null;
      })}
    </ul>
  );
}

interface SideBarProps {
  docsDirectories: PageItem[];
  flatDirectories: Item[];
  fullDirectories: Item[];
  asPopover?: boolean;
  headings: Heading[];
  includePlaceholder: boolean;
}

export function Sidebar({
  docsDirectories,
  asPopover = false,
  headings,
  includePlaceholder,
}: SideBarProps): ReactElement {
  const config = useConfig();
  const { menu, setMenu } = useMenu();
  const router = useRouter();
  const [focused, setFocused] = useState<null | string>(null);

  const anchors = useMemo(
    () => headings.filter((v) => v.depth === 2),
    [headings],
  );
  const sidebarRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (menu) {
      document.body.classList.add("nx-overflow-hidden", "md:nx-overflow-auto");
    } else {
      document.body.classList.remove(
        "nx-overflow-hidden",
        "md:nx-overflow-auto",
      );
    }
  }, [menu]);

  useEffect(() => {
    const activeElement = sidebarRef.current?.querySelector("li.active");

    if (activeElement && (window.innerWidth > 1024 || menu)) {
      const scroll = () => {
        scrollIntoView(activeElement, {
          block: "center",
          inline: "center",
          scrollMode: "always",
          boundary: containerRef.current,
        });
      };
      if (menu) {
        // needs for mobile since menu has transition transform
        setTimeout(scroll, 300);
      } else {
        scroll();
      }
    }
  }, [menu]);

  // Always close mobile nav when route was changed (e.g. logo click)
  useEffect(() => {
    setMenu(false);
  }, [router.asPath, setMenu]);

  return (
    <>
      {includePlaceholder && asPopover ? (
        <div className="max-xl:nx-hidden nx-h-0 nx-w-64 nx-shrink-0" />
      ) : null}
      <div
        className={cn(
          "motion-reduce:nx-transition-none [transition:background-color_1.5s_ease]",
          menu
            ? "nx-fixed nx-inset-0 nx-z-10 nx-bg-black/80 dark:nx-bg-black/60"
            : "nx-bg-transparent",
        )}
        onClick={() => setMenu(false)}
      />
      <div className="nextra-scrollbar-bg">
        <aside
          className={cn(
            "nextra-sidebar-container nx-sidebar-scrollable    nx-flex nx-flex-col nx-p-3",
            "md:nx-top-16 md:nx-shrink-0 motion-reduce:nx-transform-none",
            "nx-transform-gpu nx-transition-all nx-ease-in-out",
            "print:nx-hidden md:nx-w-72",
            asPopover ? "md:nx-hidden" : "md:nx-sticky md:nx-self-start",
            menu
              ? "max-md:[transform:translate3d(0,0,0)]"
              : "max-md:[transform:translate3d(0,-100%,0)]",
          )}
          ref={containerRef}
        >
          <FocusedItemContext.Provider value={focused}>
            <OnFocusItemContext.Provider
              value={(item) => {
                setFocused(item);
              }}
            >
              <div className={cn("nx-sidebar-scrollable")} ref={sidebarRef}>
                {/* without asPopover check <Collapse />'s inner.clientWidth on `layout: "raw"` will be 0 and element will not have width on initial loading */}
                {!asPopover && (
                  <Collapse isOpen horizontal>
                    <Menu
                      className="max-md:nx-hidden"
                      // The sidebar menu, shows only the docs directories.
                      directories={docsDirectories}
                      // When the viewport size is larger than `md`, hide the anchors in
                      // the sidebar when `floatTOC` is enabled.
                      anchors={config.toc.float ? [] : anchors}
                      onlyCurrentDocs
                    />
                  </Collapse>
                )}
                <Menu
                  className="md:nx-hidden"
                  // The mobile dropdown menu, shows all the directories.
                  directories={docsDirectories}
                  // Always show the anchor links on mobile (`md`).
                  anchors={anchors}
                />
              </div>
            </OnFocusItemContext.Provider>
          </FocusedItemContext.Provider>
        </aside>
      </div>
    </>
  );
}
