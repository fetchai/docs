import React, { ChangeEvent, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./footer.module.css";

const Footer: React.FC = () => {
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
        () =>
          setFormData((prev) => ({
            ...prev,
            email: "",
            successMsg: "",
            loading: false,
          })),
        5000,
      );
    }

    setFormData((prev) => ({ ...prev, email: "", loading: false }));
  };

  return (
    <footer className="nx-px-6 md:nx-px-0 nx-max-w-[1010px] nx-my-8 nx-mx-auto">
      <div className="nx-relative md:nx-px-0 lg:nx-container xs:nx-mx-0 md:nx-mx-auto">
        <div className="nx-grid nx-items-start nx-grid-cols-1 sm:nx-grid-cols-3 sm:nx-gap-8">
          <div className="">
            <div className="nx-flex nx-items-center nx-mb-4 nx-justify-start">
              <Image
                src="/docs/docs-logo.svg"
                alt="Logo"
                width={32}
                height={10}
                className="nx-w-32 nx-h-10"
              />
            </div>
            <div>
              <p className="nx-mb-4 nx-mr-0 nx-flex nx-justify-center nx-text-left nx-text-base nx-font-normal nx-text-[#999EB1] md:nx-max-w-[400px] lg:nx-text-left">
                Creating AI platforms and services that let anyone build and
                deploy AI services at scale, anytime and anywhere.
              </p>
              <div className="nx-hidden nx-text-base nx-text-[#999EB1] md:nx-block">
                <p className="nx-mb-8">
                  © 2025 Fetch.ai. All rights reserved.
                </p>
              </div>
            </div>
            <hr className="nx-my-6 nx-border-gray-600 nx-opacity-20 sm:nx-hidden" />
          </div>
          <div className="nx-col-span-2 sm:nx-m-0 md:nx-mx-auto ">
            <div className="nx-flex nx-auto-cols-auto-auto geist-mono-font-family nx-leading-[160%] nx-text-sm nx-uppercase nx-font-medium nx-text-[#000D3D] nx-gap-[88px]">
              <div className="nx-items-star nx-inline-flex nx-flex-col nx-gap-[12px] lg:nx-items-start">
                <Link
                  className="nx-block hover:nx-underline"
                  id="fetch_ai_footer"
                  href="https://fetch.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  FETCH.AI
                </Link>
                <Link
                  className="nx-block hover:nx-underline"
                  id="asi_1_footer"
                  href="https://asi1.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ASI:ONE
                </Link>
                <Link
                  className="nx-block hover:nx-underline"
                  id="agentversse_footer"
                  href="https://agentverse.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  AGENTVERSE
                </Link>
                <Link
                  className="nx-block hover:nx-underline"
                  id="flockx_footer"
                  href="https://flockx.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  flockx
                </Link>
              </div>
              <div className="nx-z-1 nx-inline-flex nx-flex-col nx-items-start nx-gap-[12px]">
                <Link
                  className="nx-block hover:nx-underline"
                  id="footer_github"
                  href="https://github.com/fetchai"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GITHUB
                </Link>
                <Link
                  className="nx-block hover:nx-underline"
                  id="x_footer"
                  href="https://x.com/Fetch_ai"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  X
                </Link>
                <Link
                  className="nx-block hover:nx-underline"
                  id="telegram_footer"
                  href="https://t.me/fetch_ai"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Telegram
                </Link>
                <Link
                  className="nx-block hover:nx-underline"
                  id="footer_discord"
                  href="https://discord.gg/fetchai"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  discord
                </Link>
                <Link
                  className="nx-block hover:nx-underline"
                  id="youtube_footer"
                  href="https://www.youtube.com/fetchai"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  youtube
                </Link>
                <Link
                  className="nx-block hover:nx-underline"
                  id="linkedin_footer"
                  href="https://www.linkedin.com/company/fetch-ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LINKEDIN
                </Link>
                <Link
                  className="nx-block hover:nx-underline"
                  id="reddit_footer"
                  href="https://www.reddit.com/r/FetchAI_Community/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  REDDIT
                </Link>
              </div>
            </div>
          </div>
        </div>
        <hr className="nx-my-12 nx-border-gray-600 nx-opacity-20" />
      </div>

      <div className="nx-flex nx-flex-col nx-gap-4 md:nx-flex-row nx-justify-between">
        <span className="nx-uppercase nx-text-[16px] nx-my-auto nx-font-medium nx-leading-[160%] nx-text-[#000D3D] geist-mono-font-family">
          Sign up for developer updates
        </span>
        <div className="nx-max-w-592">
          <div className={styles.inputBox}>
            <input
              onChange={handleInputChange}
              onBlur={onBlur}
              className={styles.inputInner}
              placeholder="Email address"
              value={formData.email}
            />
            <button
              onClick={handleSubmit}
              className="nx-hidden md:nx-block nx-bg-[#000] nx-text-[#fff] nx-uppercase nx-font-medium geist-mono-font-family nx-px-2 nx-py-2 nx-rounded-lg nx-text-[14px] nx-w-[120px]"
            >
              {formData.loading ? (
                <div role="status" className="nx-flex">
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
              className={`nx-h-5 nx-ml-auto ${
                formData.successMsg && `${styles.textSuccess}`
              } ${formData.message && "error-text"} `}
            >
              {formData.message || formData.successMsg}
            </span>
          }
        </div>

        <button
          onClick={handleSubmit}
          className="nx-block md:nx-hidden nx-mt-2 nx-bg-[#000] nx-text-[#fff] nx-uppercase nx-font-medium geist-mono-font-family nx-px-2 nx-py-2 nx-rounded-lg nx-text-[14px] nx-w-[120px]"
        >
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
    </footer>
  );
};

export default Footer;
