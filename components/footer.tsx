import React, { ChangeEvent, useState, useCallback } from "react";
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
import Logo from "./logo";

const FooterLink = ({
  content: { description, path },
}: {
  content: { description: string; path: string };
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      id={addUnderscoreInText(description)}
      onClick={() => window.open(path, "_blank", "noopener, noreferrer")}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <p className={isHovered ? styles.footerTextHover : styles.footerText}>
        {description}
      </p>
    </section>
  );
};

const Footer: React.FC = () => {
  const developers = [
    { description: "Main website", path: "https://fetch.ai/" },
    { description: "Integrations", path: "https://fetch.ai/integrations" },
    { description: "Events", path: "https://fetch.ai/events" },
    { description: "We’re hiring!", path: "https://fetch.ai/careers" },
  ];

  const [formData, setFormData] = useState({
    email: "",
    message: "",
    successMsg: "",
    loading: false,
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, email: event.target.value }));
  };

  const validateEmail = useCallback(() => {
    const { email } = formData;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setFormData((prev) => ({
        ...prev,
        message: "Please enter your email address.",
      }));
      return false;
    }
    if (!regex.test(email)) {
      setFormData((prev) => ({
        ...prev,
        message: "Please enter a valid email address.",
      }));
      return false;
    }
    return true;
  }, [formData.email]);

  const onBlur = useCallback(() => {
    validateEmail();
    setTimeout(() => {
      setFormData((prev) => ({ ...prev, message: "" }));
    }, 5000);
  }, [validateEmail]);

  const handleSubmit = async () => {
    if (!validateEmail()) return;

    setFormData((prev) => ({ ...prev, loading: true }));

    const response = await fetch("/docs/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: formData.email }),
    });

    if (response.ok) {
      setFormData({
        email: "",
        message: "",
        successMsg: "Thank you for signing up for developer updates!",
        loading: false,
      });
      setTimeout(
        () => setFormData((prev) => ({ ...prev, successMsg: "" })),
        5000,
      );
    }
  };

  return (
    <footer
      className={`nx-pl-[max(env(safe-area-inset-left),1.5rem)] nx-pr-[max(env(safe-area-inset-right),1.5rem)] ${styles.footer}`}
    >
      <section className={styles.page}>
        <div className={styles.footerUpper}>
          <Logo />
          <div className={styles.footerLinkSection}>
            {developers.map((content, index) => (
              <FooterLink key={index} content={content} />
            ))}
          </div>
        </div>
        <div className={styles.footerLower}>
          <div className={styles.footerMenu}>
            <Anchor
              id="footer-social-twitter"
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
              id="footer-social-telegram"
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
              id="footer-social-discord"
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
              id="footer-social-github"
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
              id="footer-social-youtube"
              className="nx-text-current"
              href="https://www.youtube.com/fetchai"
              newWindow
            >
              {renderComponent(
                <>
                  <Youtube />
                  <span className="nx-sr-only">YouTube</span>
                </>,
              )}
            </Anchor>
            <Anchor
              id="footer-social-linkedin"
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
              id="footer-social-reddit"
              className="nx-text-current"
              href="https://www.reddit.com/r/FetchAI_Community/"
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
                  Sign up for developer updates
                </span>
                <div className={styles.inputBox}>
                  <input
                    onChange={handleInputChange}
                    onBlur={onBlur}
                    className={styles.inputInner}
                    placeholder="Email address"
                    value={formData.email}
                  />
                </div>
              </div>
              <button onClick={handleSubmit} className={styles.signBtn}>
                {formData.loading ? (
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="text-white nx-inline nx-h-4 nx-w-4 nx-me-3 nx-animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3293 21.5636 82.5976 25.8506C85.1192 29.275 87.1043 33.0792 88.4642 37.1346C89.2472 39.4867 91.5422 40.778 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                    Loading...
                  </div>
                ) : (
                  "Sign up"
                )}
              </button>
            </div>

            {
              <span
                className={`nx-h-5 nx-ml-1 ${
                  formData.successMsg && `${styles.textSuccess}`
                } ${formData.message && "error-text"} `}
              >
                {formData.message || formData.successMsg}
              </span>
            }
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
