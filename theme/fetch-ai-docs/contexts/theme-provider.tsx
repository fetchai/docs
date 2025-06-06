"use client";
import { ThemeProvider } from "next-themes";
import React from "react";
export function ThemeDocProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      {children}
    </ThemeProvider>
  );
}
