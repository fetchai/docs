import React from 'react';
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

interface Item {
  title: string;
  description: React.ReactNode;
  icon: string; // Provide the path to the icon
}

interface SectionProps {
  heading: string;
  items: Item[];
}

const Section: React.FC<SectionProps> = ({ heading, items }) => {
  return (
    <div className="nx-my-8">
      <h2 className="nx-text-xl nx-font-semibold nx-text-gray-400">{heading}</h2>
      <div className="nx-grid nx-grid-cols-1 md:nx-grid-cols-3 nx-gap-4 nx-mt-4">
        {items.map((item, index) => (
          <div key={index} className="nx-p-4 nx-flex">
            <Image src={item.icon} alt={`Icon for ${item.title}`} className={styles.productIcon} />
            <div>
              <h3 className="nx-text-black nx-font-bold nx-mb-2">{item.title}</h3>
              <p className="nx-text-gray-500 nx-text-sm nx-font-light">
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
        ))}
      </div>
    </div>
  );
};

const items: { [key: string]: Item[] } = {
  'AI Engine': [
    { title: 'AI Agents API', description: (<>Description to explain <strong>what to expect</strong> or <strong>quick links</strong> to popular articles</>), icon: apiAgentIcon },
    { title: 'Agents Insights', description: (<>Description to explain <strong>what to expect</strong> or <strong>quick links</strong> to popular articles</>),icon: insightsAgentIcon },
    { title: 'Whisper', description: (<>Description to explain <strong>what to expect</strong> or <strong>quick links</strong> to popular articles</>),icon: whisperAgentIcon },
    { title: 'uAgents', description: (<>Description to explain <strong>what to expect</strong> or <strong>quick links</strong> to popular articles</>),icon: walletIcon },
    { title: 'Search & Discovery API', description: (<>Description to explain <strong>what to expect</strong> or <strong>quick links</strong> to popular articles</>),icon: walletIcon },
    { title: 'Agentverse Explorer', description: (<>Description to explain <strong>what to expect</strong> or <strong>quick links</strong> to popular articles</>),icon: walletIcon },
  ],
  'AI Agent Services': [
    { title: 'Hosting / Managed Agents', description: (<>Description to explain <strong>what to expect</strong> or <strong>quick links</strong> to popular articles</>),icon: walletIcon },
    { title: 'Mailbox / IoT Agents', description: (<>Description to explain <strong>what to expect</strong> or <strong>quick links</strong> to popular articles</>),icon: mailBoxIcon },
    { title: 'Authetication API', description: (<>Description to explain <strong>what to expect</strong> or <strong>quick links</strong> to popular articles</>),icon: authenticationIcon },
    { title: 'uAgents', description: (<>Description to explain <strong>what to expect</strong> or <strong>quick links</strong> to popular articles</>),icon: walletIcon },
    { title: 'Search & Discovery API', description: (<>Description to explain <strong>what to expect</strong> or <strong>quick links</strong> to popular articles</>),icon: walletIcon },
    { title: 'Agentverse Explorer', description: (<>Description to explain <strong>what to expect</strong> or <strong>quick links</strong> to popular articles</>),icon: explorerIcon },
  ],
  'Open Network': [
    { title: 'Fetch Ledger', description: (<>Description to explain <strong>what to expect</strong> or <strong>quick links</strong> to popular articles</>),icon: whisperAgentIcon },
    { title: 'Names Service', description: (<>Description to explain <strong>what to expect</strong> or <strong>quick links</strong> to popular articles</>),icon: walletIcon },
    { title: 'Alamanac', description: (<>Description to explain <strong>what to expect</strong> or <strong>quick links</strong> to popular articles</>),icon: almanacIcon },
    { title: 'Cosmpy', description: (<>Description to explain <strong>what to expect</strong> or <strong>quick links</strong> to popular articles</>),icon: walletIcon },
    { title: 'Jenesis', description: (<>Description to explain <strong>what to expect</strong> or <strong>quick links</strong> to popular articles</>),icon: walletIcon },
    { title: 'Alamanac', description: (<>Description to explain <strong>what to expect</strong> or <strong>quick links</strong> to popular articles</>),icon: walletIcon },
  ],
};

const IndexPage: React.FC = () => {
  return (
    <div className="nx-container nx-mx-auto nx-py-8">
      {Object.entries(items).map(([heading, itemList]) => (
        <Section key={heading} heading={heading} items={itemList} />
      ))}
    </div>
  );
};

export default IndexPage;
