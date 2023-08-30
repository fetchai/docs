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
            Description to explain{' '}
            <strong>
              <span style={{ color: 'black', fontWeight: '500' }}>what to expect</span>
            </strong>{' '}
            or{' '}
            <strong>
              <span style={{ color: 'black', fontWeight: '500' }}>quick links</span>
            </strong>{' '}
            to popular articles
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
    { title: 'Intelligence LLMS', description: (<>Description to explain <strong>what to expect</strong> or <strong>quick links</strong> to popular articles</>), icon: apiAgentIcon , path: "/concepts/ai-engine/general-intelligence-with-llms"},
    { title: 'Context Control', description: (<>Description to explain <strong>what to expect</strong> or <strong>quick links</strong> to popular articles</>),icon: insightsAgentIcon , path: "/guides"},
    { title: 'DeltaV', description: (<>Description to explain <strong>what to expect</strong> or <strong>quick links</strong> to popular articles</>),icon: whisperAgentIcon , path: "/guides"},
    { title: 'Analytics', description: (<>Description to explain <strong>what to expect</strong> or <strong>quick links</strong> to popular articles</>),icon: walletIcon , path: "/guides"},
    ],
  'AI Agent Services': [
    { title: 'Hosting', description: (<>Description to explain <strong>what to expect</strong> or <strong>quick links</strong> to popular articles</>),icon: walletIcon , path: "/concepts/agent-services/agent-hosting"},
    { title: 'Mailbox', description: (<>Description to explain <strong>what to expect</strong> or <strong>quick links</strong> to popular articles</>),icon: mailBoxIcon , path: "/concepts/agent-services/agent-mail"},
    { title: 'Agent APIs', description: (<>Description to explain <strong>what to expect</strong> or <strong>quick links</strong> to popular articles</>),icon: authenticationIcon , path: "/concepts/agent-services/agent-apis"},
    { title: 'Explorer', description: (<>Description to explain <strong>what to expect</strong> or <strong>quick links</strong> to popular articles</>),icon: walletIcon , path: "/concepts/agent-services/agent-explorer"},
    { title: 'Search & Discovery', description: (<>Description to explain <strong>what to expect</strong> or <strong>quick links</strong> to popular articles</>),icon: walletIcon , path: "/references/contracts/uagents-almanac/almanac-overview"},
  ],
  'Open Network': [
    { title: 'Fetch Ledger', description: (<>Description to explain <strong>what to expect</strong> or <strong>quick links</strong> to popular articles</>),icon: whisperAgentIcon, path: "/guides"},
    { title: 'Names Service', description: (<>Description to explain <strong>what to expect</strong> or <strong>quick links</strong> to popular articles</>),icon: walletIcon , path: "/guides"},
    { title: 'Almanac', description: (<>Description to explain <strong>what to expect</strong> or <strong>quick links</strong> to popular articles</>),icon: almanacIcon , path: "/references/contracts/uagents-almanac/almanac-overview"},
    { title: 'Cosmpy', description: (<>Description to explain <strong>what to expect</strong> or <strong>quick links</strong> to popular articles</>),icon: walletIcon , path: "/guides/fetch-network/cosmpy/install"},
    { title: 'Wallet', description: (<>Description to explain <strong>what to expect</strong> or <strong>quick links</strong> to popular articles</>),icon: walletIcon , path: "/guides/fetch-network/fetch-wallet-getting-started"},
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
