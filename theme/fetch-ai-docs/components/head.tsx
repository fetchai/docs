import type { NextSeoProps } from "next-seo";
import React from "react";
import { NextSeo } from "next-seo";
import { useTheme } from "next-themes";
import NextHead from "next/head";
import { useMounted } from "nextra/hooks";
import type { ReactElement } from "react";
import { useConfig } from "../contexts";
import { useRouter } from "next/router";

export function Head(): ReactElement {
  const config = useConfig();
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();
  const router = useRouter();

  // `head` can be either FC or ReactNode. We have to directly call it if it's an
  // FC because hooks like Next.js' `useRouter` aren't allowed inside NextHead.
  const head =
    typeof config.head === "function" ? config.head({}) : config.head;
  const hue = config.primaryHue;
  const { dark: darkHue, light: lightHue } =
    typeof hue === "number" ? { dark: hue, light: hue } : hue;
  const frontMatter = config.frontMatter as NextSeoProps;

  return (
    <>
      <NextSeo
        title={config.title}
        description={frontMatter.description}
        canonical={`${router.basePath}${router.pathname}`}
        openGraph={frontMatter.openGraph}
        {...config.useNextSeoProps?.()}
      />
      <NextHead>
        {mounted ? (
          <meta
            name="theme-color"
            content={resolvedTheme === "dark" ? "#111" : "#fff"}
          />
        ) : (
          <>
            <meta
              name="theme-color"
              content="#fff"
              media="(prefers-color-scheme: light)"
            />
            <meta
              name="theme-color"
              content="#111"
              media="(prefers-color-scheme: dark)"
            />
          </>
        )}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
        <style>{`
        :root {
          --nextra-primary-hue: ${lightHue}deg;
          --nextra-navbar-height: 5.5rem;
          --nextra-menu-height: 3.75rem;
          --nextra-banner-height: 2.5rem;
        }
        
        .dark {
          --nextra-primary-hue: ${darkHue}deg;
        }
      `}</style>
        {head}
      </NextHead>
    </>
  );
}
