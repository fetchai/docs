import React from "react";
import { useTheme } from "next-themes";
import { z } from "zod";
import { useState } from "react";
import { ThemeMode } from "../helpers";
import { motion, AnimatePresence } from "framer-motion";

export const themeOptionsSchema = z.strictObject({
  light: z.string(),
  dark: z.string(),
  system: z.string(),
});

const animations = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.3 },
};

const osmenu = [
  {
    name: ThemeMode.Light,
    icon: (isActive: boolean, isHovered: boolean) => (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${
          isActive || isHovered
            ? "os-icon-active dark:os-icon-active"
            : "os-icon-normal"
        } `}
      >
        <path d="M12.75 4.75V6.75C12.75 7.1875 12.4062 7.5 12 7.5C11.5625 7.5 11.25 7.1875 11.25 6.75V4.75C11.25 4.34375 11.5625 4 12 4C12.4062 4 12.75 4.34375 12.75 4.75ZM17.6562 7.40625L16.2188 8.84375C15.9375 9.125 15.4688 9.125 15.1562 8.84375C14.875 8.53125 14.875 8.0625 15.1562 7.78125L16.5938 6.34375C16.875 6.0625 17.3438 6.0625 17.6562 6.34375C17.9375 6.65625 17.9375 7.125 17.6562 7.40625ZM7.375 6.34375L8.8125 7.78125C9.09375 8.0625 9.09375 8.53125 8.8125 8.84375C8.5 9.125 8.03125 9.125 7.75 8.84375L6.34375 7.40625C6.03125 7.125 6.03125 6.65625 6.34375 6.34375C6.625 6.0625 7.09375 6.0625 7.375 6.34375ZM4.75 11.25H6.75C7.15625 11.25 7.5 11.5938 7.5 12C7.5 12.4375 7.15625 12.75 6.75 12.75H4.75C4.3125 12.75 4 12.4375 4 12C4 11.5938 4.3125 11.25 4.75 11.25ZM17.25 11.25H19.25C19.6562 11.25 20 11.5938 20 12C20 12.4375 19.6562 12.75 19.25 12.75H17.25C16.8125 12.75 16.5 12.4375 16.5 12C16.5 11.5938 16.8125 11.25 17.25 11.25ZM8.8125 16.25L7.375 17.6562C7.09375 17.9688 6.625 17.9688 6.34375 17.6562C6.03125 17.375 6.03125 16.9062 6.34375 16.625L7.75 15.1875C8.03125 14.9062 8.5 14.9062 8.8125 15.1875C9.09375 15.5 9.09375 15.9688 8.8125 16.25ZM16.2188 15.1875L17.6562 16.625C17.9375 16.9062 17.9375 17.375 17.6562 17.6562C17.3438 17.9688 16.875 17.9688 16.5938 17.6562L15.1562 16.25C14.875 15.9688 14.875 15.5 15.1562 15.1875C15.4688 14.9062 15.9375 14.9062 16.2188 15.1875ZM12.75 17.25V19.25C12.75 19.6875 12.4062 20 12 20C11.5625 20 11.25 19.6875 11.25 19.25V17.25C11.25 16.8438 11.5625 16.5 12 16.5C12.4062 16.5 12.75 16.8438 12.75 17.25ZM14 12C14 11.3125 13.5938 10.6562 13 10.2812C12.375 9.9375 11.5938 9.9375 11 10.2812C10.375 10.6562 10 11.3125 10 12C10 12.7188 10.375 13.375 11 13.75C11.5938 14.0938 12.375 14.0938 13 13.75C13.5938 13.375 14 12.7188 14 12ZM8.5 12C8.5 10.75 9.15625 9.625 10.25 9C11.3125 8.34375 12.6562 8.34375 13.75 9C14.8125 9.625 15.5 10.75 15.5 12C15.5 13.2812 14.8125 14.4062 13.75 15.0312C12.6562 15.6875 11.3125 15.6875 10.25 15.0312C9.15625 14.4062 8.5 13.2812 8.5 12Z" />
      </svg>
    ),
  },
  {
    name: ThemeMode.Dark,
    icon: (isActive: boolean, isHovered: boolean) => (
      <svg
        width="13"
        height="14"
        viewBox="0 0 13 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${
          isActive || isHovered
            ? "os-icon-active dark:os-icon-active"
            : "os-icon-normal"
        }`}
      >
        <path d="M4.5 2.09375C2.71875 3 1.5 4.875 1.5 7C1.5 10.0625 3.9375 12.5 6.96875 12.5C7.375 12.5 7.78125 12.4688 8.1875 12.375C5.4375 11.4375 3.46875 8.8125 3.46875 5.75C3.46875 4.40625 3.84375 3.15625 4.5 2.09375ZM6.4375 0.03125C6.53125 0.03125 6.59375 0.03125 6.65625 0.03125C6.78125 0.03125 6.875 0.03125 6.96875 0.03125C7.0625 0.03125 7.15625 0.03125 7.21875 0.03125C7.34375 0.03125 7.4375 0.03125 7.5625 0.03125C7.78125 0.0625 7.96875 0.21875 8 0.4375C8.0625 0.65625 7.96875 0.875 7.78125 0.96875C7.65625 1.03125 7.5625 1.09375 7.46875 1.15625C7.34375 1.25 7.21875 1.34375 7.09375 1.4375C7.03125 1.46875 7 1.5 6.96875 1.53125C5.75 2.53125 4.96875 4.0625 4.96875 5.78125C4.96875 8.8125 7.4375 11.25 10.4375 11.2812C10.4688 11.2812 10.4688 11.2812 10.4688 11.2812C10.5 11.2812 10.5312 11.2812 10.5625 11.2812C10.75 11.25 10.9062 11.25 11.0625 11.25C11.1562 11.2188 11.2812 11.2188 11.4062 11.1875C11.625 11.1562 11.8438 11.25 11.9375 11.4375C12.0312 11.6562 12 11.875 11.8438 12.0312C11.75 12.125 11.6875 12.1875 11.5938 12.25C11.4375 12.375 11.3125 12.5 11.1562 12.625C11.0938 12.6562 11.0312 12.7188 10.9688 12.75C9.84375 13.5312 8.46875 14 6.96875 14C3.125 14 0 10.875 0 7C0 3.3125 2.84375 0.3125 6.4375 0.03125Z" />
      </svg>
    ),
  },
];

const ThemeOption = ({
  item,
  isActive,
  isHovered,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: {
  item: (typeof osmenu)[0];
  isActive: boolean;
  isHovered: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) => (
  <div
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    className={`osmenu-tab-container nx-justify-center nx-cursor-pointer nx-items-center ${
      isActive ? "nx-bg-active-menu-os dark:nx-bg-active-menu-os" : ""
    }`}
  >
    <span>{item.icon(isActive, isHovered)}</span>
  </div>
);

export const ThemeSwitcher = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  return (
    <AnimatePresence>
      <motion.div
        initial={animations.initial}
        animate={animations.animate}
        exit={animations.exit}
        transition={animations.transition}
        className="nav-dropdown-container nx-z-50 nx-w-full nx-right-0 nx-absolute"
      >
        <div className="nav-tab nx-w-full nx-justify-between">
          <span className="nav-icon-txt">Theme</span>
          <div className="osmenu-container-nav">
            {osmenu.map((item, index) => {
              const isActive = resolvedTheme === item.name;
              const isHovered = hoverIndex === index;

              return (
                <ThemeOption
                  key={item.name}
                  item={item}
                  isActive={isActive}
                  isHovered={isHovered}
                  onClick={() => setTheme(item.name)}
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                />
              );
            })}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
