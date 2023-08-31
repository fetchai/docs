import React, { useState } from 'react';
import Image from 'next/image';
import apiAgentIcon from '../src/svgs/agents-api.svg'
import insightsAgentIcon from '../src/svgs/agents-insights.svg'
import whisperAgentIcon from '../src/svgs/agents-whisper.svg'
import walletIcon from '../src/svgs/wallet.svg'
import mailBoxIcon from '../src/svgs/mailbox.svg'
import authenticationIcon from '../src/svgs/authentication.svg'
import explorerIcon from '../src/svgs/explorer.svg'
import almanacIcon from '../src/svgs/almanac.svg'
import styles from './tab.module.css'
import { useRouter } from 'next/navigation'

interface Item {
  title: string;
  description: React.ReactNode;
  icon: string; // Provide the path to the icon
  path: string; // Link to the content
}

interface SectionProps {
  heading: string;
  items: Item[];
}

const Item = ({ item, index }) => {

  const [hover, setHover] = useState<boolean>(false);
  const router = useRouter()
  return (
    <div key={index} className="nx-p-4 nx-flex nx-cursor-pointer" onClick={() => router.push(item.path)} onMouseOver={() => {setHover(true)}} onMouseLeave={() => {setHover(false)}}>
      <Image src={item.icon} alt={`Icon for ${item.title}`} className={styles.productIcon} />
      <div>
        <h3 className={hover ? "nx-text-purple nx-text-lg nx-font-medium nx-mb-2" : "nx-text-black nx-text-lg nx-font-medium nx-mb-2"}>{item.title}</h3>
        <p className="nx-text-gray-500 nx-text-base nx-font-light">
          <>
            {item.description}
          </>
        </p>
      </div>
    </div>
  );
};

const Section: React.FC<SectionProps> = ({ heading, items }) => {

  return (
    <div className="nx-my-8" >
      <h2 className={"nx-text-lg nx-font-medium nx-text-fetch-light-grey"}>{heading}</h2>
      <div className="nx-grid nx-grid-cols-1 md:nx-grid-cols-3 nx-gap-4 nx-mt-4">
        {items.map((item, index) => (
          <Item item={item} index={index}/>
        ))}
      </div>
    </div>
  );
};

const items: { [key: string]: Item[] } = {
  'AI Engine': [
    { title: 'Synergy of agent-based services and AI Engine ecosystem', description: (<>Discover how the AI Engine facilitates interactions by discovering user preferences, transforming raw data into actionable insights through collaboration with agent-based services.</>), icon: apiAgentIcon , path: "/concepts/ai-engine/the-synergetic-power-of-agent-based-services-in-the-ai-engine-ecosystem"},
    { title: 'Context building and smart routing', description: (<>In the realm of the AI Engine's capabilities, the process of discovering new information takes a main stage, elevating user experiences to new heights.</>),icon: insightsAgentIcon , path: "/concepts/ai-engine/context-building-and-smart-routing"},
    { title: 'DeltaV', description: (<>Description to be added.</>),icon: whisperAgentIcon , path: "/guides"},
    { title: 'Analytics', description: (<>Description to be added.</>),icon: walletIcon , path: "/guides"},
    ],
  'AI Agent Services': [
    { title: 'Hosting', description: (<>The Agentverse hosting platform enables all users to get started quickly and to deploy agents to the cloud to start connecting and automating.</>),icon: walletIcon , path: "/concepts/agent-services/agent-hosting"},
    { title: 'Mailbox', description: (<>Set up mailboxes for your locally agents and to run them independently of your constant presence to run the server.</>),icon: mailBoxIcon , path: "/concepts/agent-services/agent-mail"},
    { title: 'Agent APIs', description: (<>Description to be added.</>),icon: authenticationIcon , path: "/concepts/agent-services/agent-apis"},
    { title: 'Explorer', description: (<>Learn to use the Agentverse Explorer to start an interaction with other registered agents.</>),icon: walletIcon , path: "/concepts/agent-services/agent-explorer"},
  ],
  'Open Network': [
    { title: 'Almanac', description: (<>Use the Almanac contract to query a particular agent's information.</>),icon: almanacIcon , path: "/references/contracts/uagents-almanac/almanac-overview"},
    { title: 'Cosmpy', description: (<>Get stated with CosmPy.</>),icon: walletIcon , path: "/guides/fetch-network/cosmpy/install"},
    { title: 'Wallet', description: (<>Let's get yourself started started with the Fetch wallet.</>),icon: walletIcon , path: "/guides/fetch-network/fetch-wallet-getting-started"},
  ],
};

const IndexPage: React.FC = () => {
  return (
    <div className="nx-container nx-mx-auto nx-py-8">
      {Object.entries(items).map(([heading, itemList], index) => (
        <div key={heading}>
          {index !== 0 && <div className="nx-mt-32 nx-mb-32 nx-border-t nx-border-gray-300" />}
          <Section heading={heading} items={itemList} />
        </div>
      ))}
    </div>
  );
};

export default IndexPage;
