import React, { useEffect, useState } from 'react';
import styles from './tab.module.css'
import { useRouter } from 'next/router';

export const GuideBox = ({content}) => {
  const router = useRouter()
  const [hover, setHover] = useState<boolean>(false);

  return <section className={hover ? styles.hoverGuideBox : styles.guideBox}
              onClick={() => {router.push(content.path)}}
              onMouseOver={() => {setHover(true)}}
              onMouseLeave={() => {setHover(false)}}>
      <h3 className="nx-text-black nx-font-medium nx-mb-2 nx-text-lg">{content.title}</h3>
      <p className="nx-text-gray-500 nx-font-normal">{content.description}</p>
    </section>
  } 

export const FeatureGuideTabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const tabItems = [
    { 
      label: 'Agents',
      content: [{
        title: 'Installing the uAgents Framework 🛠️📲',
        description: 'A guide for installing the uAgents Framework correctly.',
        path: 'guides/agents/installing-uagent'

      },{
        title: 'Creating your first μAgent 🤖🧑‍💻',
        description: 'A guide showing you how to create your first agent in few minutes.',
        path: 'guides/agents/create-a-uagent'
      },
      {
        title: 'How to use uAgents to verify messages 📬🔐',
        description: 'A guide showing you how to use uAgents to verify messages.',
        path: 'guides/agents/message-verification'
      },{
        title: 'Registering in the Almanac contract',
        description: 'A guide showing you how to correctly register within the Almanac contract.',
        path: 'guides/agents/register-in-almanac'
      },
      {
        title: 'Communicating with other uAgents 📱🤖',
        description: 'A guide showing different communication methods between agents.',
        path: 'guides/agents/communicating-with-other-agents'
      },{
        title: 'How to use the uAgents to simulate a cleaning scenario ✨',
        description: 'A guide teaching you how agents can be used to set up a cleaning scenario.',
        path: 'guides/agents/cleaning-demo'
      },{
        title: 'Getting μAgent addresses 🤖📫',
        description: 'A guide teaching you how to retrieve μAgent addresses.',
        path: 'guides/agents/getting-uagent-address'
      },{
        title: 'How to book a table at a restaurant using uAgents',
        description: 'A guide showcasing a table booking process using uAgents.',
        path: 'guides/agents/booking-demo'
      }]
    },
    { 
      label: 'Hosting',
      content: [{
        title: 'Creating a hosted agent 🤖',
        description: 'Use the Agentverse Hosting service to develop your agents directly on the Agentverse platform.',
        path: '/guides/agentverse/creating-a-hosted-agent'
      },{
        title: 'Discovering agents 🔎',
        description: 'Learn to use the Agentverse Explorer to start an interaction with other registered agents.',
        path: '/guides/agentverse/discovering-agents'
      },
      {
        title: 'Utilising the Agentverse Mailbox Service 📬',
        description: 'Set up mailboxes for your locally-run agents and to run them independently of your constant presence to run the server.',
        path: '/guides/agentverse/utilising-the-mailbox'
      },{
        title: 'Registering Agent Services',
        description: 'Description to be added.',
        path: '/guides/agentverse/registering-agent-services'
      }]
    },
    { 
      label: 'Other',
      content: [{
        title: 'Fetch Wallet 💵',
        description: 'A guide helping you to get started with the Fetch wallet.',
        path: '/guides/fetch-network/fetch-wallet-getting-started'
      },{
        title: 'How to convert FET to and from ERC20 🔄',
        description: 'A guide for converting Native FET to and from ERC-20 FET.',
        path: '/guides/fetch-network/how-to-convert-fet-to-and-from-erc20'
      }]
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  

  return (
    <div>
      <div className='nx-my-8'>
        {isMobile ? (
          <div className="nx-relative">
            <select
              className="nx-block nx-appearance-none nx-w-full nx-px-4 nx-py-2 nx-pr-8 nx-rounded-md nx-bg-gray-300 nx-text-gray-700"
              value={activeTab}
              onChange={(e) => setActiveTab(parseInt(e.target.value))}
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
                <path
                  d="M6 9v2l4-3-4-3v2H1v2h5zm8-2v2h5v2H14v2l-4-3 4-3zm-1 8a1 1 0 0 0 0-2H3v4h10a1 1 0 0 0 0-2z"
                />
              </svg>
            </div>
          </div>
        ) : (
          <div className='nx-flex'><div className={styles.tabsTopContainer}>{tabItems.map((tab, index) => (
            <button
              key={index}
              className={`nx-px-6 nx-py-2 ${
                index === activeTab
                  ? 'nx-bg-black nx-text-white nx-rounded-md'
                  : ''
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
          {tabItems[activeTab].content.map(content => {
            return <GuideBox content={content}/>
          })}
        </div>
      </div>
    </div>
  );
};