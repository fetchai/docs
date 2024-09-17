import React, { ReactNode, useState, useEffect, useRef } from "react";
import { Tab as HeadlessTab } from "@headlessui/react";
import { DropDownArrow, Tickicon } from "src/icons/shared-icons";
import { motion } from "framer-motion";

function InfoIcon(properties) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" {...properties}>
      <circle cx="8" cy="8" r="8" strokeWidth="0" />
      <path
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M6.75 7.75h1.5v3.5"
      />
      <circle cx="8" cy="4" r=".5" fill="none" />
    </svg>
  );
}

function WarnIcon(properties) {
  return (
    <svg viewBox="0 0 16 16" fill="red" aria-hidden="true" {...properties}>
      <path d="M8 0a8 8 0 1 0 8 8A8.009 8.009 0 0 0 8 0zm0 14a6 6 0 1 1 6-6 6.007 6.007 0 0 1-6 6zm1-9H7v6h2zm0 7H7v2h2z" />
    </svg>
  );
}

export function Note({ children }: { children: ReactNode }) {
  return (
    <div className="nx-my-6 nx-flex nx-gap-2.5 nx-rounded-2xl nx-border nx-border-emerald-500/20 nx-bg-emerald-50/50 nx-p-4 nx-leading-6 nx-text-emerald-900 nx-dark:border-emerald-500/30 nx-dark:bg-emerald-500/5 nx-dark:text-emerald-200 nx-dark:[--tw-prose-links-hover:theme(colors.emerald.300)] nx-dark:[--tw-prose-links:theme(colors.white)]">
      <InfoIcon className="nx-mt-1 nx-h-4 nx-w-4 nx-flex-none nx-fill-emerald-500 nx-stroke-white nx-dark:fill-emerald-200/20 nx-dark:stroke-emerald-200" />
      <div className="[&gt;:first-child]:nx-mt-0 [&gt;:last-child]:nx-mb-0">
        {children}
      </div>
    </div>
  );
}

export function Warn({ children }: { children: ReactNode }) {
  return (
    <div className="nx-my-6 nx-flex nx-gap-2.5 nx-rounded-2xl nx-border nx-border-red-500/20 nx-bg-red-50/50 nx-p-4 nx-leading-6 nx-text-red-900 nx-dark:border-red-500/30 nx-dark:bg-red-500/5 nx-dark:text-red-200 nx-dark:[--tw-prose-links-hover:theme(colors.red.300)] nx-dark:[--tw-prose-links:theme(colors.white)]">
      <WarnIcon className="nx-mt-1 nx-h-4 nx-w-4 nx-flex-none nx-fill-red-500 nx-stroke-white nx-dark:fill-red-200/20 nx-dark:stroke-red-200" />
      <div className="[&gt;:first-child]:nx-mt-0 [&gt;:last-child]:nx-mb-0">
        {children}
      </div>
    </div>
  );
}

export function Properties({ children }: { children: ReactNode }) {
  return (
    <div className="nx-my-6">
      <ul
        role="list"
        className="nx-m-0 nx-max-w-[calc(theme(maxWidth.lg)-theme(spacing.8))] nx-list-none nx-divide-y nx-divide-zinc-900/5 nx-p-0 nx-dark:divide-white/5"
      >
        {children}
      </ul>
    </div>
  );
}

export function Property({
  name,
  type,
  required,
  children,
}: {
  name: string;
  type: string;
  required: boolean;
  children: ReactNode;
}) {
  return (
    <li className="nx-m-0 nx-px-0 nx-py-4 nx-first:pt-0 nx-last:pb-0">
      <dl className="nx-m-0 nx-flex nx-flex-wrap nx-items-center nx-gap-x-3 nx-gap-y-2">
        <dt className="nx-sr-only">Name</dt>
        <dd>
          <code>{name}</code>
        </dd>
        <dt className="nx-sr-only">Type</dt>
        <dd className="nx-font-mono nx-text-xs nx-text-zinc-400 nx-dark:text-zinc-500">
          {type}
        </dd>
        {required !== undefined && (
          <>
            <dt className="nx-sr-only">Required</dt>
            <dd className="nx-font-mono nx-text-xs nx-text-zinc-400 nx-dark:text-zinc-500">
              {required ? `required` : `optional`}
            </dd>
          </>
        )}

        <dt className="nx-sr-only">Description</dt>
        <dd className="nx-w-full nx-flex-none [&gt;:first-child]:nx-mt-0 [&gt;:last-child]:nx-mb-0">
          {children}
        </dd>
      </dl>
    </li>
  );
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// leaving half as I think this will  be needed in future
export function Tabs({
  children,
  half = false,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
  half: boolean;
}) {
  return (
    <div
      className={`nx-rounded nx-h-min nx-overflow-auto ${
        half ? "nx-w-full" : "nx-w-full"
      }`}
    >
      <HeadlessTab.Group>
        <HeadlessTab.List className="nx-flex nx-space-x-1 nx-rounded-xl nx-p-1">
          {React.Children.map(children, (child, index) => (
            <HeadlessTab
              key={index}
              className={({ selected }) =>
                classNames(
                  "nx-w-full nx-rounded-lg nx-py-2.5 nx-text-sm nx-font-medium nx-bg-slate-100",
                  " nx-focus:outline-none nx-focus:ring-2",
                  selected
                    ? "nx-shadow"
                    : "nx-text-white-100 nx-hover:bg-white/[0.12] nx-hover:text-white",
                )
              }
            >
              {child.props.heading}
            </HeadlessTab>
          ))}
        </HeadlessTab.List>
        <HeadlessTab.Panels>
          {React.Children.map(children, (child, index) => (
            <HeadlessTab.Panel
              key={index}
              className={classNames(
                "nx-p-3 nx-ring-opacity-60 nx-ring-offset-2 nx-ring-offset-blue-400 nx-focus:outline-none nx-focus:ring-2",
              )}
            >
              {child.props.children}
            </HeadlessTab.Panel>
          ))}
        </HeadlessTab.Panels>
      </HeadlessTab.Group>
    </div>
  );
}

interface TabProps {
  heading: string;
  children: ReactNode;
}

interface DropDownTabsProps {
  children: React.ReactElement<TabProps>[] | React.ReactElement<TabProps>;
}

export function DropDownTabs({ children }: DropDownTabsProps) {
  const [selectedTab, setSelectedTab] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const tabs = React.Children.toArray(
    children,
  ) as React.ReactElement<TabProps>[];

  const handleTabChange = (index: number) => {
    setSelectedTab(index);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <>
      <div
        className="nx-relative nx-mb-5 nx-items-center nx-gap-2 nx-cursor-pointer nx-justify-center nx-dropdown-container"
        onClick={() => setIsOpen(!isOpen)}
        style={{ userSelect: "none" }}
      >
        {tabs[selectedTab]?.props.heading}
        <DropDownArrow />
      </div>
      <div ref={dropdownRef}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 0.1 }}
            className="nx-z-50 nx-absolute dropDown"
            style={{ overflow: "hidden" }}
          >
            {tabs.map((child, index) => (
              <div
                key={index}
                className={`dropdown-tab nx-justify-between tab-text nx-cursor-pointer ${
                  index === selectedTab && `indgo-100`
                }`}
                onClick={() => handleTabChange(index)}
              >
                {child?.props.heading}
                {index === selectedTab && <Tickicon />}
              </div>
            ))}
          </motion.div>
        )}
        <div className="mt-4">{tabs[selectedTab]?.props.children}</div>
      </div>
    </>
  );
}

export function Tab(properties) {
  return <HeadlessTab {...properties} />;
}

export function Row({ children }: { children: ReactNode }) {
  return (
    <div className="nx-pt-4 nx-gap-8 row-width nx-flex-mdx">{children}</div>
  );
}

export function Col({ children }: { children: ReactNode }) {
  return <div className="nx-w-1/2-mdx nx-w-full-mdx">{children}</div>;
}

export function Section({ children }: { children: ReactNode }) {
  return <div className="nx-my-32">{children}</div>;
}

export function ApiIntro({ children }: { children: ReactNode }) {
  return <div className="nx-pb-4 nx-pr-4">{children}</div>;
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <div className="nx-bg-green-100 nx-border nx-rounded nx-w-fit nx-p-2">
      {children}
    </div>
  );
}

export function CodeHeading({ children }: { children: ReactNode }) {
  return <div className="nx-flex nx-gap-2">{children}</div>;
}

export function Grid3({ children }: { children: ReactNode }) {
  return (
    <div className="nx-grid nx-grid-cols-1 nx-pt-4 sm:nx-grid-cols-1 md:nx-grid-cols-2 lg:nx-grid-cols-3 nx-gap-4">
      {children}
    </div>
  );
}

export function Grid2({ children }: { children: ReactNode }) {
  return (
    <div className="nx-grid nx-grid-cols-1 nx-pt-4 sm:nx-grid-cols-1 md:nx-grid-cols-2 lg:nx-grid-cols-2 nx-gap-4">
      {children}
    </div>
  );
}
