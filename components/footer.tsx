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
      description: "Main website",
      path: "https://fetch.ai/",
    },
    {
      description: "Integrations",
      path: "https://fetch.ai/integrations",
    },
    {
      description: "Events",
      path: "https://fetch.ai/events",
    },
    {
      description: "We’re hiring!",
      path: "https://fetch.ai/careers",
    },
  ];

  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
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
      setMessage("Please enter your email address.");
    } else if (regex.test(email)) {
      setMessage("");
    } else {
      setMessage("Please enter a valid email address.");
    }
  };

  return (
    <footer
      className={`nx-pl-[max(env(safe-area-inset-left),1.5rem)] nx-pr-[max(env(safe-area-inset-right),1.5rem)] ${styles.footer}`}
    >
      <section className={styles.page}>
        <div className={styles.footerUpper}>
          <Image src={logo} alt="footer-logo" />
          <div className={styles.footerLinkSection}>
            {developers.map((content, index) => {
              return <FooterLink key={index} content={content} />;
            })}
          </div>
        </div>
        <div className={styles.footerLower}>
          <div className={styles.footerMenu}>
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
          <div className={styles.footerInputSection}>
            <div className={styles.footerInputWrapper}>
              <div className={styles.footerInput}>
                <span className={styles.footerText}>
                  Sign up to for developer updates
                </span>
                <div className={styles.inputBox}>
                  <input
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      setEmail(event.target.value)
                    }
                    onBlur={handleBlur}
                    className={styles.inputInner}
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              <button onClick={onClick} className={styles.signBtn}>
                <span>Sign up</span>
              </button>
            </div>
            <span className="nx-h-5 nx-ml-1 error-text">{message}</span>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
