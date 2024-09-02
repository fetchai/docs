import React, { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import apiAgentIcon from "../src/svgs/api-agents.svg";
import whisperAgentIcon from "../src/svgs/delta-v.svg";
import agentFunction from "../src/svgs/agent-functions.svg";
import aiEngine from "../src/svgs/ai-engine.svg";
import walletIcon from "../src/svgs/wallet.svg";
import cosmpyIcon from "../src/svgs/cosmpy.svg";
import analyticsIcon from "../src/svgs/analytics.svg";
import hostingIcon from "../src/svgs/hosting.svg";
import mailBoxIcon from "../src/svgs/mailbox.svg";
import explorerIcon from "../src/svgs/explorer.svg";
import almanacIcon from "../src/svgs/almanac.svg";
import synergyIcon from "../src/svgs/synergy.svg";
import ledgerIcon from "../src/svgs/ledger.svg";
import styles from "./tab.module.css";
import { useRouter } from "next/navigation";

interface Item {
  title: string;
  description: React.ReactNode;
  icon: string; // Provide the path to the icon
  path: string; // Link to the content
}

interface SectionProperties {
  heading: string;
  items: Item[];
}

const Item = ({
  item,
  index,
}: {
  item: {
    icon: string;
    title: string;
    path: string;
    description: ReactNode;
  };
  index: number;
}) => {
  const router = useRouter();
  const [hover, setHover] = useState<boolean>(false);
  return (
    <div
      id={item.title.toLowerCase().split(" ").join("-")}
      key={index}
      className="nx-p-4 nx-flex nx-cursor-pointer"
      onClick={() => router.push(item.path)}
      onMouseOver={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      <div className="nx-flex nx-gap-6">
        <span>
          <div className={hover ? styles.productHover : styles.productWrap}>
            <Image
              src={item.icon}
              alt={`Icon for ${item.title}`}
              className={styles.productIcon}
            />
          </div>
        </span>

        <div>
          <h3
            className={
              hover
                ? "nx-text-purple nx-text-lg nx-font-medium nx-mb-2"
                : "nx-text-black nx-text-lg nx-font-medium nx-mb-2"
            }
          >
            {item.title}
          </h3>
          <p className={styles.productDescripton}>
            <>{item.description}</>
          </p>
        </div>
      </div>
    </div>
  );
};

const Section: React.FC<SectionProperties> = ({ heading, items }) => {
  useEffect(() => {
    // Check if there is a hash fragment in the URL
    if (window.location.hash) {
      // Get the ID of the section corresponding to the hash fragment
      const sectionId = window.location.hash.slice(1);

      // Find the section element by its ID
      // eslint-disable-next-line unicorn/prefer-query-selector
      const sectionElement = document.getElementById(sectionId);

      // Scroll to the section if it exists
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []); // This effect runs once when the component mounts

  const sectionId = heading.replaceAll(" ", "").toLowerCase();
  return (
    <div id={sectionId} className="nx-my-8">
      <h2 className={styles.productsHeading}>{heading}</h2>
      <div className="nx-grid nx-grid-cols-1 max-width-section md:nx-grid-cols-2 nx-gap-4 nx-mt-4">
        {items.map((item, index) => (
          <Item key={index} item={item} index={index} />
        ))}
      </div>
    </div>
  );
};

const items: { [key: string]: Item[] } = {
  "AI Engine": [
    {
      title: "Introducing the AI Engine",
      description: (
        <>Introducing the AI Engine and its role in DeltaV functionalities.</>
      ),
      icon: aiEngine,
      path: "/concepts/ai-engine/ai-engine-intro",
    },
    {
      title: "Powering connections and smart operations in DeltaV",
      description: (
        <>
          Explore the integration of AI Engine within DeltaV, enabling
          connections between users and agent-based Functions.
        </>
      ),
      icon: synergyIcon,
      path: "/concepts/ai-engine/powering-connections-and-smart-operations-in-deltav",
    },
    {
      title: "DeltaV",
      description: (
        <>
          DeltaV operates as a search-based AI chat interface, employing natural
          language conversations to assist users in objective execution.
        </>
      ),
      icon: whisperAgentIcon,
      path: "https://deltav.agentverse.ai/login",
    },
    {
      title: "Analytics",
      description: <>Coming soon.</>,
      icon: analyticsIcon,
      path: "/guides",
    },
  ],
  "Agentverse components": [
    {
      title: "Agentverse: My Agents",
      description: (
        <>
          The Agentverse My Agents section enables all users to get started
          quickly and to deploy agents to the cloud to start connecting and
          automating.
        </>
      ),
      icon: hostingIcon,
      path: "/concepts/agent-services/agent-hosting",
    },
    {
      title: "Agentverse: Mailroom / IoT Gateway",
      description: (
        <>
          Set up mailboxes for your local agents so that your agent doesn&apos;t
          need to accessible all the time.
        </>
      ),
      icon: mailBoxIcon,
      path: "/concepts/agent-services/agent-mail",
    },
    {
      title: "Agentverse Functions: register your Functions on the Agentverse!",
      description: (
        <>
          Create an agent encapsulating a Function and register it as an Agent
          Function on the Agentverse to be retrieved via DeltaV chat!
        </>
      ),
      icon: agentFunction,
      path: "/guides/agentverse/registering-agent-services",
    },
    {
      title: "Agentverse APIs",
      description: <>Understand and use the Agentverse APIs.</>,
      icon: apiAgentIcon,
      path: "/apis#agentverse-apis",
    },
    {
      title: "Agentverse: Explorer",
      description: (
        <>
          Learn to use the Agentverse Explorer to start an interaction with
          other registered agents.
        </>
      ),
      icon: explorerIcon,
      path: "/concepts/agent-services/agent-explorer",
    },
  ],
  "Open Network": [
    {
      title: "Almanac",
      description: (
        <>
          Use the Almanac contract to query a particular agent&apos;s
          information.
        </>
      ),
      icon: almanacIcon,
      path: "/references/contracts/uagents-almanac/almanac-overview",
    },
    {
      title: "CosmPy",
      description: <>Get started with CosmPy.</>,
      icon: cosmpyIcon,
      path: "/guides/fetch-network/cosmpy/install",
    },
    {
      title: "Wallet",
      description: <>Get started with the ASI Alliance Wallet.</>,
      icon: walletIcon,
      path: "/guides/fetch-network/fetch-wallet/web-wallet/get-started",
    },
    {
      title: "Ledger",
      description: <>Get started with the Fetch Ledger.</>,
      icon: ledgerIcon,
      path: "/concepts/fetch-network/ledger/intro",
    },
  ],
};

const IndexPage: React.FC = () => {
  return (
    <div>
      {Object.entries(items).map(([heading, itemList], index) => (
        <div key={heading}>
          {index !== 0 && (
            <div className="nx-mt-16 nx-mb-16 nx-border-t nx-border-gray-300" />
          )}
          <Section heading={heading} items={itemList} />
        </div>
      ))}
    </div>
  );
};

export default IndexPage;
