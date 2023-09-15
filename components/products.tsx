import React, { ReactNode, useState } from "react";
import Image from "next/image";
import apiAgentIcon from "../src/svgs/api-agents.svg";
import insightsAgentIcon from "../src/svgs/context-control.svg";
import whisperAgentIcon from "../src/svgs/delta-v.svg";
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
  const [hover, setHover] = useState<boolean>(false);
  const router = useRouter();
  return (
    <div
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
      <Image
        src={item.icon}
        alt={`Icon for ${item.title}`}
        className={styles.productIcon}
      />
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
        <p className="nx-text-gray-500 nx-text-base nx-font-light">
          <>{item.description}</>
        </p>
      </div>
    </div>
  );
};

const Section: React.FC<SectionProperties> = ({ heading, items }) => {
  return (
    <div className="nx-my-8">
      <h2 className={"nx-text-lg nx-font-medium nx-text-fetch-light-grey"}>
        {heading}
      </h2>
      <div className="nx-grid nx-grid-cols-1 md:nx-grid-cols-3 nx-gap-4 nx-mt-4">
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
      title: "Synergy of agent-based services and AI Engine ecosystem",
      description: (
        <>
          Discover how the AI Engine facilitates interactions by discovering
          user preferences, transforming raw data into actionable insights
          through collaboration with agent-based services.
        </>
      ),
      icon: synergyIcon,
      path: "/concepts/ai-engine/the-synergetic-power-of-agent-based-services-in-the-ai-engine-ecosystem",
    },
    {
      title: "Context building and smart routing",
      description: (
        <>
          In the realm of the AI Engine&apos;s capabilities, the process of
          discovering new information takes a main stage, elevating user
          experiences to new heights.
        </>
      ),
      icon: insightsAgentIcon,
      path: "/concepts/ai-engine/context-building-and-smart-routing",
    },
    {
      title: "DeltaV",
      description: <>Coming soon.</>,
      icon: whisperAgentIcon,
      path: "/guides",
    },
    {
      title: "Analytics",
      description: <>Coming soon.</>,
      icon: analyticsIcon,
      path: "/guides",
    },
  ],
  "AI Agent Services": [
    {
      title: "Hosting",
      description: (
        <>
          The Agentverse hosting platform enables all users to get started
          quickly and to deploy agents to the cloud to start connecting and
          automating.
        </>
      ),
      icon: hostingIcon,
      path: "/concepts/agent-services/agent-hosting",
    },
    {
      title: "Mailbox",
      description: (
        <>
          Set up mailboxes for your local agents and to run them independently
          of your constant presence to run the server.
        </>
      ),
      icon: mailBoxIcon,
      path: "/concepts/agent-services/agent-mail",
    },
    {
      title: "Agent APIs",
      description: <>Understand and use the Agentverse APIs.</>,
      icon: apiAgentIcon,
      path: "/apis/agentverse",
    },
    {
      title: "Explorer",
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
      title: "Cosmpy",
      description: <>Get stated with CosmPy.</>,
      icon: cosmpyIcon,
      path: "/guides/fetch-network/cosmpy/install",
    },
    {
      title: "Wallet",
      description: (
        <>Let&apos;s get yourself started started with the Fetch wallet.</>
      ),
      icon: walletIcon,
      path: "/guides/fetch-network/fetch-wallet-getting-started",
    },
    {
      title: "Ledger",
      description: <>Coming soon.</>,
      icon: ledgerIcon,
      path: "",
    },
  ],
};

const IndexPage: React.FC = () => {
  return (
    <div className="nx-container nx-mx-auto nx-py-8">
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
