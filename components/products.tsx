import React, { useEffect, useState } from 'react';
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
  route: string;
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
  useEffect(() => {
    // Check if there is a hash fragment in the URL
    if (window.location.hash) {
      // Get the ID of the section corresponding to the hash fragment
      const sectionId = window.location.hash.substring(1);

      // Find the section element by its ID
      const sectionElement = document.getElementById(sectionId);

      // Scroll to the section if it exists
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []); // This effect runs once when the component mounts

  const sectionId = heading.replace(/ /g, '').toLowerCase()
  return (
    <div id={sectionId} className="nx-my-8">
      <h2 className={"nx-text-lg nx-font-medium nx-text-fetch-light-grey"}>{heading}</h2>
      <div className="nx-grid nx-grid-cols-1 md:nx-grid-cols-3 nx-gap-4 nx-mt-4">
        {items.map((item, index) => (
          <Item item={item} index={index} />
        ))}
      </div>
    </div>
  );
};

const items: { [key: string]: {route: string, list: Item[]} } = {
  'AI Engine': {
    route: '/guides',
    list: [
    { title: 'Synergy of agent-based services and AI Engine ecosystem', description: (<>Discover how the AI Engine facilitates interactions by discovering user preferences, transforming raw data into actionable insights through collaboration with agent-based services.</>), icon: apiAgentIcon , path: "/concepts/ai-engine/the-synergetic-power-of-agent-based-services-in-the-ai-engine-ecosystem"},
    { title: 'Context building and smart routing', description: (<>In the realm of the AI Engine's capabilities, the process of discovering new information takes a main stage, elevating user experiences to new heights.</>),icon: insightsAgentIcon , path: "/concepts/ai-engine/context-building-and-smart-routing"},
    { title: 'DeltaV', description: (<>Coming soon.</>),icon: whisperAgentIcon , path: "/guides"},
    { title: 'Analytics', description: (<>Coming soon.</>),icon: walletIcon , path: "/guides"},
    ]},
  'AI Agent Services': {
    route: '/guides',
    list:[
    { title: 'Hosting', description: (<>The Agentverse hosting platform enables all users to get started quickly and to deploy agents to the cloud to start connecting and automating.</>),icon: walletIcon , path: "/concepts/agent-services/agent-hosting"},
    { title: 'Mailbox', description: (<>Set up mailboxes for your local agents and to run them independently of your constant presence to run the server.</>),icon: mailBoxIcon , path: "/concepts/agent-services/agent-mail"},
    { title: 'Agent APIs', description: (<>Understand and use the Agentverse APIs.</>),icon: authenticationIcon , path: "/apis/agentverse"},
    { title: 'Explorer', description: (<>Learn to use the Agentverse Explorer to start an interaction with other registered agents.</>),icon: walletIcon , path: "/concepts/agent-services/agent-explorer"},
  ]},
  'Open Network': {
    route: '/guides',
    list:[
    { title: 'Almanac', description: (<>Use the Almanac contract to query a particular agent's information.</>),icon: almanacIcon , path: "/references/contracts/uagents-almanac/almanac-overview"},
    { title: 'Cosmpy', description: (<>Get stated with CosmPy.</>),icon: walletIcon , path: "/guides/fetch-network/cosmpy/install"},
    { title: 'Wallet', description: (<>Let's get yourself started started with the Fetch wallet.</>),icon: walletIcon , path: "/guides/fetch-network/fetch-wallet-getting-started"},
    { title: 'Ledger', description: (<>Coming soon.</>),icon: almanacIcon , path: ""},
  ]},
};

const IndexPage: React.FC = () => {
  return (
    <div className="nx-container nx-mx-auto nx-py-8">
      {Object.entries(items).map(([heading, itemList], index) => (
        <div key={heading}>
          {index !== 0 && <div className="nx-mt-32 nx-mb-32 nx-border-t nx-border-gray-300" />}
          <Section heading={heading} items={itemList.list} route={itemList.route} />
        </div>
      ))}
    </div>
  );
};

export default IndexPage;
