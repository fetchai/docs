import React, { useEffect, useState } from "react";
import styles from "./tab.module.css";
import { useRouter } from "next/router";

export const GuideBox = ({
  content,
}: {
  content: {
    title: string;
    description: string;
    path: string;
  };
}) => {
  const router = useRouter();
  const [hover, setHover] = useState<boolean>(false);

  return (
    <section
      className={hover ? styles.hoverGuideBox : styles.guideBox}
      onClick={() => {
        router.push(content.path);
      }}
      onMouseOver={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      id={content.title.toLowerCase().split(" ").join("-")}
    >
      <h3 className="nx-text-black nx-font-medium nx-mb-2 nx-text-lg">
        {content.title}
      </h3>
      <p className="nx-text-gray-500 nx-font-normal">{content.description}</p>
    </section>
  );
};

export const FeatureGuideTabs = ({ centerMode }: { centerMode?: boolean }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const tabItems = [
    {
      label: "Agents",
      content: [
        {
          title: "Installing the uAgents Framework",
          description:
            "A guide for installing the uAgents Framework correctly.",
          path: "guides/agents/installing-uagent",
        },
        {
          title: "Creating your first agent",
          description:
            "A guide showing how to create your first agent in few minutes.",
          path: "guides/agents/create-a-uagent",
        },
        {
          title: "How to use agents to verify messages",
          description: "A guide showing how to use agents to verify messages.",
          path: "guides/agents/message-verification",
        },
        {
          title: "Registering in the Almanac contract",
          description:
            "A guide showing how to correctly register agents within the Almanac contract.",
          path: "guides/agents/register-in-almanac",
        },
        {
          title: "Communicating with other agents",
          description:
            "A guide showing different communication methods between agents.",
          path: "guides/agents/communicating-with-other-agents",
        },
        {
          title: "Agent address",
          description: "A guide showing how to retrieve agents addresses.",
          path: "guides/agents/getting-uagent-address",
        },
      ],
    },
    {
      label: "Agentverse",
      content: [
        {
          title: "Creating an Agentverse hosted agent",
          description:
            "Use the Agentverse: My Agents tab to develop agents directly on the Agentverse platform.",
          path: "/guides/agentverse/creating-a-hosted-agent",
        },
        {
          title: "Utilizing the Agentverse Mailroom service",
          description:
            "Set up Agentverse mailboxes for your locally-run agents and to run them independently of your constant presence to run the server.",
          path: "/guides/agentverse/utilising-the-mailbox",
        },
        {
          title:
            "Agentverse Functions: register your Agent Functions on the Agentverse!",
          description:
            "Discover how to register and make discoverable Agents' Functions within the Agentverse and DeltaV!",
          path: "/guides/agentverse/registering-agent-services",
        },
        {
          title:
            "Agentverse Functions: register a coin toss agent as a Function",
          description:
            "Create and make an coin toss Function discoverable on the Agentverse and DeltaV!",
          path: "/guides/agentverse/registering-agent-coin-toss",
        },
        {
          title: "Agentverse allowed imports",
          description:
            "Understand what modules are provided within the Agentverse platform.",
          path: "/guides/agentverse/registering-agent-services",
        },
      ],
    },
    {
      label: "Other",
      content: [
        {
          title: "ASI Alliance Wallet",
          description:
            "A guide helping you to get started with the ASI Alliance wallet.",
          path: "/guides/fetch-network/fetch-wallet/web-wallet/get-started",
        },
        {
          title: "How to convert FET to and from ERC20",
          description:
            "A guide for converting Native FET to and from ERC-20 FET.",
          path: "/guides/fetch-network/how-to-convert-fet-to-and-from-erc20",
        },
        {
          title: "How to get testnet tokens via the Token Faucet",
          description:
            "Learn how to get testnet tokens using the Faucet service.",
          path: "/guides/fetch-network/ledger/faucet",
        },
        {
          title: "Ledger",
          description: "Get started with the Fetch Ledger.",
          path: "/concepts/fetch-network/ledger/intro",
        },
        {
          title: "CosmPy",
          description: "A guide helping you to get started with CosmPy tools.",
          path: "/guides/fetch-network/cosmpy/install",
        },
        {
          title: "Jenesis",
          description: "A guide helping you to get started with Jenesis tools.",
          path: "/guides/fetch-network/jenesis/getting-started",
        },
      ],
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <div className="nx-my-8">
        {isMobile ? (
          <div className="nx-relative">
            <select
              className="nx-block nx-appearance-none nx-w-full nx-px-4 nx-py-2 nx-pr-8 nx-rounded-md nx-bg-gray-300 nx-text-gray-700"
              value={activeTab}
              onChange={(event) =>
                setActiveTab(Number.parseInt(event.target.value))
              }
            >
              {tabItems.map((tab, index) => (
                <option key={index} value={index}>
                  {tab.label}
                </option>
              ))}
            </select>
            <div className="nx-pointer-events-none nx-absolute nx-inset-y-0 nx-right-0 nx-flex nx-items-center nx-px-2 nx-text-gray-700">
              <svg
                className="nx-w-4 nx-h-4 nx-fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M6 9v2l4-3-4-3v2H1v2h5zm8-2v2h5v2H14v2l-4-3 4-3zm-1 8a1 1 0 0 0 0-2H3v4h10a1 1 0 0 0 0-2z" />
              </svg>
            </div>
          </div>
        ) : (
          <div className={`nx-flex ${centerMode && "nx-justify-center"}`}>
            <div className={styles.tabsTopContainer}>
              {tabItems.map((tab, index) => (
                <button
                  key={index}
                  className={`nx-px-6 nx-py-2 ${
                    index === activeTab
                      ? "nx-bg-selected-tab nx-text-white nx-rounded-md"
                      : ""
                  }`}
                  onClick={() => setActiveTab(index)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="nx-mt-4">
        <div className="nx-grid nx-grid-cols-1 sm:nx-grid-cols-2 md:nx-grid-cols-3 lg:nx-grid-cols-4 nx-gap-4">
          {tabItems[activeTab].content.map((content, index) => {
            return <GuideBox key={index} content={content} />;
          })}
        </div>
      </div>
    </div>
  );
};
