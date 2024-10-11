"use client";
import React, { useState, useEffect } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "next-themes";
import Image from "next/image";
import { z } from "zod";

const osmenu = [
  {
    name: "light",
    icon: <FiSun />,
  },
  {
    name: "dark",
    icon: <FiMoon />,
  },
];

export const themeOptionsSchema = z.strictObject({
  light: z.string(),
  dark: z.string(),
  system: z.string(),
});

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { setTheme } = useTheme();
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null
  }
  return (
    <div className="nav-dropdown-container nx-z-50 nx-w-full nx-right-0 nx-absolute">
      <div className="nav-tab nx-w-full nx-justify-between">
        <span className="nav-icon-txt">Theme</span>
        <div className="osmenu-container-nav">
          {osmenu.map((item, index) => (
            <div
              key={index}
              onClick={() => setTheme(item.name)}
              className={`osmenu-tab-container nx-justify-center nx-cursor-pointer nx-items-center`}
            >
              <span>{item.icon}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ThemeSwitcher;
