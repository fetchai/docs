import React, { useState } from "react";
import Image from "next/image";
import logo from "src/svgs/logo.svg";
import styles from "./footer.module.css";
import { Anchor } from "theme/fetch-ai-docs/components";
import { renderComponent } from "theme/fetch-ai-docs/utils";
import { DiscordIcon, GitHubIcon } from "nextra/icons";
import { addUnderscoreInText } from "theme/fetch-ai-docs/helpers";
import {
  Discord,
  Github,
  LinkedIn,
  Reddit,
  Telegram,
  Twitter,
  Youtube,
} from "src/icons/footer-icons";

const FooterLink = ({
  content,
}: {
  content: {
    description: string;
    path: string;
  };
}) => {
  const [hover, setHover] = useState<boolean>(false);
  return (
    <section
      id={addUnderscoreInText(content.description)}
      onClick={() => {
        window.open(content.path, "_blank", "noopener, noreferrer");
      }}
      onMouseOver={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      <p
        className={hover ? `${styles.footerTextHover}` : `${styles.footerText}`}
      >
        {content.description}
      </p>
    </section>
  );
};

const Footer: React.FC = () => {
  const developers = [
    {
      description: "Docs",
      path: "https://fetch.ai/docs",
    },
    {
      description: "AI Agents",
      path: "https://fetch.ai/docs/guides/agents/installing-uagent",
    },
    {
      description: "Agentverse.ai",
      path: "https://agentverse.ai/",
    },
  ];

  const company = [
    {
      description: "Blog",
      path: "https://fetch.ai/blog",
    },
    {
      description: "Fetch.ai Foundation",
      path: "https://fetchai.foundation/",
    },
    {
      description: "Careers",
      path: "https://fetch.ai/careers",
    },
    {
      description: "Website",
      path: "https://fetch.ai",
    },
  ];

  const legal = [
    {
      description: "Press and Media",
      path: "https://fetch.ai/press-media",
    },
    {
      description: "Privacy Policy",
      path: "https://fetch.ai/privacy-policy",
    },
    {
      description: "Terms of Service",
      path: "https://fetch.ai/terms-of-condition",
    },
  ];

  return (
    <footer className="nx-flex nx-flex-col nx-py-16 nx-pl-[max(env(safe-area-inset-left),7rem)] nx-pr-[max(env(safe-area-inset-right),7rem)]">
      <div className={styles.footerInner}>
        <div className={styles.footerLeft}>
          <div className="nx-flex nx-flex-col nx-items-start nx-gap-6">
            <Image src={logo} alt="Logo" />
            <p className={styles.footerText}>
              Creating AI platforms and services that let anyone build and
              deploy AI services at scale, anytime and anywhere.
            </p>
            <div>
              <p className="nx-text-gray-600 nx-text-sm">
                © 2024 Fetch.ai. All rights reserved.
              </p>
            </div>
          </div>
          <div className="nx-flex nx-gap-6 nx-items-center">
            <Anchor
              className="nx-text-current"
              href="https://discord.gg/fetchai"
              newWindow
            >
              {renderComponent(
                <>
                  <Twitter />
                  <span className="nx-sr-only">Twitter</span>
                </>,
              )}
            </Anchor>
            <Anchor
              className="nx-text-current"
              href="https://discord.gg/fetchai"
              newWindow
            >
              {renderComponent(
                <>
                  <Telegram />
                  <span className="nx-sr-only">Telegram</span>
                </>,
              )}
            </Anchor>

            <Anchor
              className="nx-text-current"
              href="https://discord.gg/fetchai"
              newWindow
            >
              {renderComponent(
                <>
                  <Discord />
                  <span className="nx-sr-only">Discord</span>
                </>,
              )}
            </Anchor>

            <Anchor
              className="nx-text-current"
              href="https://github.com/fetchai"
              newWindow
            >
              {renderComponent(
                <>
                  <Github />
                  <span className="nx-sr-only">GitHub</span>
                </>,
              )}
            </Anchor>
            <Anchor
              className="nx-text-current"
              href="https://github.com/fetchai"
              newWindow
            >
              {renderComponent(
                <>
                  <Youtube />
                  <span className="nx-sr-only">Youtube</span>
                </>,
              )}
            </Anchor>
            <Anchor
              className="nx-text-current"
              href="https://github.com/fetchai"
              newWindow
            >
              {renderComponent(
                <>
                  <LinkedIn />
                  <span className="nx-sr-only">LinkedIn</span>
                </>,
              )}
            </Anchor>
            <Anchor
              className="nx-text-current"
              href="https://github.com/fetchai"
              newWindow
            >
              {renderComponent(
                <>
                  <Reddit />
                  <span className="nx-sr-only">Reddit</span>
                </>,
              )}
            </Anchor>
          </div>
        </div>

        <div className="nx-grid nx-grid-cols-2 sm:nx-grid-cols-2 lg:nx-grid-cols-3 nx-justify-between nx-w-[592px] ">
          <div className="nx-flex nx-flex-col nx-gap-6">
            <h4 className={styles.footerHeading}>Developers</h4>
            <div className="nx-flex nx-flex-col nx-gap-3">
              {developers.map((content, index) => {
                return <FooterLink key={index} content={content} />;
              })}
            </div>
          </div>

          <div className="nx-flex nx-flex-col nx-gap-6">
            <h4 className={styles.footerHeading}>Company</h4>
            <div className="nx-flex nx-flex-col nx-gap-3">
              {company.map((content, index) => {
                return <FooterLink key={index} content={content} />;
              })}
            </div>
          </div>

          <div className="nx-flex nx-flex-col nx-gap-6">
            <h4 className={styles.footerHeading}>Legal</h4>
            <div className="nx-flex nx-flex-col nx-gap-3">
              {legal.map((content, index) => {
                return <FooterLink key={index} content={content} />;
              })}
            </div>
          </div>
        </div>
      </div>
      <hr className="nx-my-16" />
      <section className="nx-flex nx-items-center nx-justify-between">
        <div className={styles.joinNewsLetter}>Join our newsletter</div>
        <div className={styles.inputBox}>
          <input
            className="nx-outline-none nx-border-none nx-bg-transparent"
            placeholder="Enter your email"
          />
          <button className="nx-bg-purple hover:nx-bg-purple-500 nx-h-11 nx-font-medium nx-text-white nx-px-4 nx-rounded-lg nx-text-sm">
            Subscribe
          </button>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
