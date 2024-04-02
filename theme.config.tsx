import React from "react";
// eslint-disable-next-line unicorn/prevent-abbreviations
import { DocsThemeConfig } from "./theme/fetch-ai-docs";
import Footer from "./components/footer";
import Logo from "./components/logo";

const config: DocsThemeConfig = {
  logo: <Logo />,
  project: {
    link: "https://github.com/fetchai",
  },
  chat: {
    link: "https://discord.gg/fetchai",
  },
  docsRepositoryBase: "https://github.com/shuding/nextra-docs-template",
  footer: {
    component: <Footer />,
  },
  search: {
    placeholder: "Search in documentation",
  },
  head: (
    <>
      <meta name="msapplication-TileColor" content="#fff" />
      <meta httpEquiv="Content-Language" content="en" />
      <meta name="description" content="Fetch.ai Documentation" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@fetch_ai" />
      <meta property="og:title" content="Fetch.ai Documentation" />
      <meta
        property="og:description"
        content="Explore our documentation, guides and examples to get to know Fetch.ai tools and products."
      />
      <meta property="og:image" content="/docs/Logo.png" />
      <meta
        name="apple-mobile-web-app-title"
        content="Fetch.ai Documentation"
      />
      <link rel="icon" href="/docs/favicon.png" sizes="any" />
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-MVT793SR');`,
        }}
      />
    </>
  ),
};

export default config;
