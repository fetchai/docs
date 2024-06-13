import { Menu, Transition } from "@headlessui/react";
import cn from "clsx";
import React, { useEffect } from "react";
import { useFSRoute } from "nextra/hooks";
import { ArrowRightIcon, MenuIcon } from "nextra/icons";
import type { Item, MenuItem, PageItem } from "nextra/normalize-pages";
import type { ReactElement, ReactNode } from "react";
import { useConfig, useMenu } from "../contexts";
import { renderComponent } from "../utils";
import { Anchor } from "./anchor";
import { useUserContext } from "../contexts/context-provider";
import AccountMenu from "components/account-menu";
// import { Listbox } from "@headlessui/react";
import { useRouter } from "next/router";
import { handleSignin } from "../helpers";
// import { capitalizeWords } from "../helpers";
// import { IoBookmarks } from "react-icons/io5";

export type NavBarProps = {
  flatDirectories: Item[];
  items: (PageItem | MenuItem)[];
  bookMark: boolean;
  fetchBookMarks: (context: unknown, isBookMark: unknown) => Promise<[string]>;
};

const classes = {
  link: cn(
    "nx-text-sm contrast-more:nx-text-gray-700 contrast-more:dark:nx-text-gray-100 nx-mt-4 nx-px-4",
  ),
  active: cn("nx-font-medium nx-subpixel-antialiased grey-background"),
  inactive: cn(
    "nx-text-gray-600 hover:nx-text-gray-800 dark:nx-text-gray-400 dark:hover:nx-text-gray-200",
  ),
};

// const getLastPart = (str) => str.match(/[^/]+$/)?.[0] || "";
// const compareLastParts = (a, b) => {
//   const lastPartA = getLastPart(a);
//   const lastPartB = getLastPart(b);
//   return lastPartA.localeCompare(lastPartB);
// };

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

const Outline = ({ children }: { children: ReactNode }) => (
  <div className="nx-flex nx-h-11 nx-px-4 nx-border-gray-200 nx-rounded-lg nx-items-center nx-outline-menu nx-justify-center">
    {children}
  </div>
);

export function Navbar({
  flatDirectories,
  items,
  bookMark,
  fetchBookMarks,
}: NavBarProps): ReactElement {
  const config = useConfig();
  const activeRoute = useFSRoute();
  const { menu, setMenu } = useMenu();
  const context = useUserContext();
  const router = useRouter();
  // const [selectedItem, setSelectedItem] = useState("Bookmarks");
  // const [bookMarksList, setbookMarksLists] = useState<string[]>([]);
  const handleSignOut = () => {
    context.signOut();
    router.push("/");
  };
  const fetchBookMarksData = async (contextvalues) => {
    await fetchBookMarks(contextvalues, true);
    // setbookMarksLists(response);
  };
  useEffect(() => {
    if (context?.user?.email) {
      fetchBookMarksData(context?.user?.email);
    }
  }, [bookMark, context?.user?.email]);
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
            <div className="nx-flex nx-justify-center menu-hide nx-mb-2 nx-items-center">
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
                    href={href}
                    key={href}
                    style={{ borderRadius: "12px" }}
                    className={cn(
                      classes.link,
                      "nx-relative nx-mr-2 nx-hidden nx-whitespace-nowrap nx-p-2 md:nx-inline-block",
                      !isActive || page.newWindow
                        ? classes.inactive
                        : classes.active,
                      index === 0 && !isActive && "-nx-ml-4", // Align the first item to the left
                    )}
                    newWindow={page.newWindow}
                    aria-current={!page.newWindow && isActive}
                  >
                    <span className="nx-absolute nx-inset-x-0 nx-text-base nx-text-center">
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

            {/* {context.isLoggedIn && (
            <span className="nx-relative">
              <Listbox value={selectedItem} onChange={setSelectedItem}>
                <Listbox.Button className="">
                  <IoBookmarks
                    style={{
                      fontSize: "21px",
                      marginTop: "5px",
                      marginRight: "5px",
                    }}
                  />
                </Listbox.Button>
                <Listbox.Options
                  style={{ left: "-4rem", top: "40px" }}
                  className="pr-6 outline-none nx-left-[-1rem] nx-z-10 nx-top-3 nx-absolute nx-rounded-lg nx-p-4 nx-text-sm nx-font-medium  nx-bg-white nx-border "
                >
                  {bookMarksList.length === 0 && (
                    <Listbox.Option
                      value="Bookmarks"
                      className=" nx-text-sm nx-text-gray-500 nx-w-full nx-select-none nx-py-2"
                    >
                      <>
                        <span className="nx-cursor-pointer hover:nx-bg-gray-400 nx-truncate">
                          No Bookmarks Yet
                        </span>
                      </>
                    </Listbox.Option>
                  )}
                  {bookMarksList
                    ?.sort((a, b) => compareLastParts(a, b))
                    .map((item: string, index: number) => (
                      <Listbox.Option
                        key={index}
                        value="Bookmarks"
                        className={({ active }) =>
                          `nx-text-sm nx-text-gray-500 nx-w-full nx-select-none nx-py-2  ${
                            active
                              ? " nx-bg-slate-900 nx-text-slate-900"
                              : "nx-text-gray-900"
                          }`
                        }
                      >
                        {({ selected }) => (
                          <>
                            <span
                              onClick={() =>
                                router.push(item.replace("/docs", ""))
                              }
                              className={` hoverSpan nx-cursor-pointer hover:nx-bg-gray-400 nx-truncate ${
                                selected ? "nx-font-medium" : "nx-font-normal"
                              }`}
                            >
                              {capitalizeWords(item.match(/[^/]+$/)[0])}
                            </span>
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                </Listbox.Options>
              </Listbox>
            </span>
          )} */}

            {config.project.link ? (
              <Anchor
                className="nx-p-2 nx-text-current nx-hidden md:nx-inline-block"
                href={config.project.link}
                newWindow
                id="github"
              >
                <Outline>{renderComponent(config.project.icon)}</Outline>
              </Anchor>
            ) : null}
            {context.isLoggedIn ? (
              <AccountMenu
                email={context?.user?.email}
                logo={context?.user?.avatarHref}
                signOut={handleSignOut}
              />
            ) : (
              <button
                onClick={handleSignin}
                id="sign_in"
                className="nx-bg-purple hover:nx-bg-purple-500 nx-h-11 nx-font-medium nx-text-white nx-px-4 nx-rounded-lg nx-text-sm"
              >
                Sign In
              </button>
            )}
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
