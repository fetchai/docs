import React, { ChangeEvent, useState } from "react";
import Image from "next/image";
import logo from "src/svgs/logo.svg";
import styles from "./footer.module.css";
import { Anchor } from "theme/fetch-ai-docs/components";
import { renderComponent } from "theme/fetch-ai-docs/utils";
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
import { Message } from "src/icons/shared-icons";

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

  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const date = new Date();
  const onClick = async () => {
    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(email),
    };
    await fetch("/docs/api/newsletter", option);
  };
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handleBlur = () => {
    if (email === "") {
      setMessage("Please enter your email address !");
    } else if (regex.test(email)) {
      setMessage("");
    } else {
      setMessage("Please enter a valid email address.");
    }
  };

  return (
    <footer className="nx-pl-[max(env(safe-area-inset-left),1.5rem)] md:nx-mt-[192px] nx-mt-10 nx-pr-[max(env(safe-area-inset-right),1.5rem)]">
      <section className={styles.page}>
        <div className={`${styles.footerInner} md:nx-flex-row nx-flex-col`}>
          <div className={styles.footerLeft}>
            <div className="nx-flex nx-flex-col nx-items-start nx-gap-6">
              <Image src={logo} alt="Logo" />
              <p className={styles.footerText}>
                Creating AI platforms and services that let anyone build and
                deploy AI services at scale, anytime and anywhere.
              </p>
              <div>
                <p className="nx-text-gray-600 nx-text-sm">
                  © {date.getFullYear()} Fetch.ai. All rights reserved.
                </p>
              </div>
            </div>
            <div className="nx-flex nx-gap-6 nx-items-center">
              <Anchor
                className="nx-text-current"
                href="https://x.com/Fetch_ai"
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
                href="https://t.me/fetch_ai"
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
                href="https://www.youtube.com/fetchai"
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
                href="https://www.linkedin.com/company/fetch-ai/"
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
                href="https://www.linkedin.com/company/fetch-ai/"
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

          <div className="nx-grid nx-grid-cols-2 sm:nx-grid-cols-2 lg:nx-grid-cols-3 nx-justify-between md:nx-w-[592px]">
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
        <section className="nx-flex nx-flex-col nx-gap-6 md:nx-flex-row md:nx-items-center nx-items-baseline nx-justify-between">
          <div className={styles.joinNewsLetter}>Join our newsletter</div>
          <div>
            <div className={styles.inputBox}>
              <input
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setEmail(event.target.value)
                }
                onBlur={handleBlur}
                className={styles.inputInner}
                placeholder="Enter your email"
              />
              <button
                onClick={onClick}
                className="nx-bg-purple  nx-flex nx-gap-2 nx-justify-between nx-items-center hover:nx-bg-purple-500 nx-h-11 nx-font-medium nx-text-white nx-px-4 nx-rounded-lg nx-text-sm"
              >
                <Message />
                <span> Subscribe</span>
              </button>
            </div>
            <p className=" nx-text-red-600 nx-mt-2 nx-ml-2">{message}</p>
          </div>
        </section>
      </section>
    </footer>
  );
};

export default Footer;
