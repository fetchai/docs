import { Menu, Transition } from "@headlessui/react";
import cn from "clsx";
import { useFSRoute } from "nextra/hooks";
import { ArrowRightIcon, MenuIcon } from "nextra/icons";
import type { Item, MenuItem, PageItem } from "nextra/normalize-pages";
import type { ReactElement, ReactNode } from "react";
import { useConfig, useMenu } from "../contexts";
import { renderComponent } from "../utils";
import { Anchor } from "./anchor";
import { useState } from "react";
import React from "react";
import { useEffect } from "react";
import { Gear } from "src/icons/shared-icons";
import { useRef } from "react";
import { ThemeSwitcher } from "..";

export type NavBarProps = {
  flatDirectories: Item[];
  items: (PageItem | MenuItem)[];
};

const classes = {
  link: cn(
    "nx-text-sm contrast-more:nx-text-gray-700 contrast-more:dark:nx-text-gray-100 nx-mt-4 nx-px-4",
  ),
  active: cn("link-active nx-subpixel-antialiased"),
  inactive: cn(
    "nx-text-gray-600 hover:nx-text-gray-800 dark:nx-text-gray-400 dark:hover:nx-text-gray-200",
  ),
};

function NavbarMenu({
  className,
  menu,
  children,
}: {
  className?: string;
  menu: MenuItem;
  children: ReactNode;
}): ReactElement {
  const { items, route } = menu;
  const routes = Object.fromEntries(
    (menu.children || []).map((route) => [route.name, route]),
  );

  return (
    <div className="nx-relative nx-inline-block">
      <Menu>
        <Menu.Button
          className={cn(
            className,
            "-nx-ml-2 nx-hidden nx-items-center nx-whitespace-nowrap nx-rounded nx-p-2 md:nx-inline-flex",
            classes.inactive,
          )}
        >
          {children}
        </Menu.Button>
        <Transition
          leave="nx-transition-opacity"
          leaveFrom="nx-opacity-100"
          leaveTo="nx-opacity-0"
        >
          <Menu.Items className="nx-absolute nx-right-0 nx-z-20 nx-mt-1 nx-max-h-64 nx-min-w-full nx-overflow-auto nx-rounded-md nx-ring-1 nx-ring-black/5 nx-bg-white nx-py-1 nx-text-sm nx-shadow-lg dark:nx-ring-white/20 dark:nx-bg-neutral-800">
            {Object.entries(items || {}).map(([key, item]) => (
              <Menu.Item key={key}>
                <Anchor
                  href={item.href || routes[key]?.route || route + "/" + key}
                  className={cn(
                    "nx-relative nx-hidden nx-w-full nx-select-none nx-whitespace-nowrap nx-text-gray-600 hover:nx-text-gray-900 dark:nx-text-gray-400 dark:hover:nx-text-gray-100 md:nx-inline-block",
                    "nx-py-1.5 nx-transition-colors ltr:nx-pl-3 ltr:nx-pr-9 rtl:nx-pr-3 rtl:nx-pl-9",
                  )}
                  newWindow={item.newWindow}
                >
                  {item.title || key}
                </Anchor>
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

export function Navbar({ flatDirectories, items }: NavBarProps): ReactElement {
  const config = useConfig();
  const activeRoute = useFSRoute();
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const { menu, setMenu } = useMenu();
  const [openOs, setOpenOs] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenOs(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="nextra-nav-container nx-sticky nx-top-0 nx-z-20 nx-w-full nx-bg-transparent print:nx-hidden">
      <div
        className={cn(
          "nextra-nav-container-blur",
          "nx-pointer-events-none nx-absolute nx-z-[-1] nx-h-full nx-w-full nx-bg-white dark:nx-bg-dark",
          "nx-shadow-[0_2px_4px_rgba(0,0,0,.02),0_1px_0_rgba(0,0,0,.06)] dark:nx-shadow-[0_-1px_0_rgba(255,255,255,.1)_inset]",
          "contrast-more:nx-shadow-[0_0_0_1px_#000] contrast-more:dark:nx-shadow-[0_0_0_1px_#fff]",
        )}
      />
      <nav className="nx-mx-auto nx-py-4 nx-items-center nx-justify-end nx-gap-2 nx-pl-[max(env(safe-area-inset-left),1.5rem)] nx-pr-[max(env(safe-area-inset-right),1.5rem)]">
        <div className="nx-flex nx-items-center nx-justify-between">
          <div className="nx-flex nx-justify-center nx-items-center nx-gap-6">
            {config.logoLink ? (
              <Anchor
                id="fetch-logo"
                href={
                  typeof config.logoLink === "string" ? config.logoLink : "/"
                }
                className="nx-flex nx-items-center"
              >
                {renderComponent(config.logo)}
              </Anchor>
            ) : (
              <div className="nx-flex nx-items-center">
                {renderComponent(config.logo)}
              </div>
            )}
            <div className="nx-flex nx-justify-center menu-hide nx-gap-2 nx-mb-2 nx-menu-height nx-items-center">
              {items.map((pageOrMenu, index) => {
                if (pageOrMenu.display === "hidden") return null;

                if (pageOrMenu.type === "menu") {
                  const menu = pageOrMenu as MenuItem;
                  return (
                    <NavbarMenu
                      key={menu.title}
                      className={cn(
                        classes.link,
                        "nx-flex nx-gap-1",
                        classes.inactive,
                      )}
                      menu={menu}
                    >
                      {menu.title}
                      <ArrowRightIcon
                        className="nx-h-[18px] nx-min-w-[18px] nx-rounded-sm nx-p-0.5"
                        pathClassName="nx-origin-center nx-transition-transform nx-rotate-90"
                      />
                    </NavbarMenu>
                  );
                }
                const page = pageOrMenu as PageItem;
                let href = page.href || page.route || "#";

                // If it's a directory
                if (page.children) {
                  href =
                    (page.withIndexPage ? page.route : page.firstChildRoute) ||
                    href;
                }

                const isActive =
                  page.route === activeRoute ||
                  activeRoute.startsWith(page.route + "/");
                return (
                  <Anchor
                    id={page.title}
                    onMouseOver={() => setHoveredLink(href)}
                    onMouseLeave={() => setHoveredLink(null)}
                    href={href}
                    key={href}
                    className={cn(
                      classes.link,
                      "nx-relative  nx-hidden nx-whitespace-nowrap menu-container  md:nx-inline-block",
                      !isActive || page.newWindow
                        ? classes.inactive
                        : classes.active,
                      hoveredLink === href && !isActive ? "link-hover" : "",
                      index === 0 && !isActive && "-nx-ml-6",
                    )}
                    newWindow={page.newWindow}
                    aria-current={!page.newWindow && isActive}
                  >
                    <span
                      className={`${
                        hoveredLink === href && !isActive ? "link-text " : ""
                      } nx-absolute nx-inset-x-0 nx-text-base nx-text-center`}
                    >
                      {page.title}
                    </span>
                    <span className="nx-invisible nx-text-base">
                      {page.title}
                    </span>
                  </Anchor>
                );
              })}
            </div>
          </div>
          <div className="nx-flex nx-items-center">
            <div className="nx-hidden nx-m-l-auto nx-search-width search-bar-desktop md:nx-inline-block">
              {renderComponent(config.search.component, {
                directories: flatDirectories,
              })}
            </div>
            <div className="nx-relative">
              <Gear onClickHandler={() => setOpenOs((prev) => !prev)} />
              {openOs && (
                <div ref={dropdownRef}>
                  <ThemeSwitcher />
                </div>
              )}
            </div>
            {config.project.link ? (
              <Anchor
                className="nx-p-2 nx-text-current nx-hidden md:nx-inline-block"
                href={config.project.link}
                newWindow
                id="github"
              >
                {renderComponent(config.project.icon)}
              </Anchor>
            ) : null}
            {renderComponent(config.navbar.extraContent)}
            <button
              type="button"
              aria-label="Menu"
              className="nextra-hamburger -nx-mr-2 nx-rounded nx-p-2 active:nx-bg-gray-400/20 hamburger"
              onClick={() => setMenu(!menu)}
            >
              <MenuIcon className={cn({ open: menu })} />
            </button>
          </div>
        </div>
        <div className="search-bar-mobile nx-mt-6 nx-mb-2">
          {renderComponent(config.search.component, {
            directories: flatDirectories,
            // className: "md:nx-hidden nx-mt-6 nx-mb-2",
          })}
        </div>
      </nav>
    </div>
  );
}
