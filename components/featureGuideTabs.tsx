import React, { useEffect, useState } from 'react';
import styles from './tab.module.css'
import { useRouter } from 'next/router';


const FeatureGuideTabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const tabItems = [
    { 
      label: 'Agents',
      content: [{
        title: 'Installing the uAgent framework',
        description: 'Welcome back to another eagerly anticipated community update.'
      },{
        title: 'Creating your first agent',
        description: 'Welcome back to another eagerly anticipated community update.'
      },
      {
        title: 'How to use μAgents to verify messages',
        description: 'Welcome back to another eagerly anticipated community update.'
      },{
        title: 'Registering in the Almanac contract',
        description: 'Welcome back to another eagerly anticipated community update.'
      },
      {
        title: 'Communicating with other agents',
        description: 'Welcome back to another eagerly anticipated community update.'
      },{
        title: 'How to use the μAgents to simulate a cleaning scenario',
        description: 'Welcome back to another eagerly anticipated community update.'
      }]
    },
    { 
      label: 'Hosting',
      content: [{
        title: 'Installing the uhosting framework',
        description: 'Welcome back to another eagerly anticipated community update.'
      },{
        title: 'Creating your first hosting',
        description: 'Welcome back to another eagerly anticipated community update.'
      },
      {
        title: 'Communicating with other hostings',
        description: 'Welcome back to another eagerly anticipated community update.'
      },{
        title: 'How to use the μhostings to simulate a cleaning scenario',
        description: 'Welcome back to another eagerly anticipated community update.'
      }]
    },
    { 
      label: 'Other',
      content: [{
        title: 'Installing other framework',
        description: 'Welcome back to another eagerly anticipated community update.'
      },{
        title: 'Creating your first other featured guide for now',
        description: 'Welcome back to another eagerly anticipated community update.'
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

  const GuideBox = ({content}) => {
    const router = useRouter()
    const [hover, setHover] = useState<boolean>(false);

    return <section className={hover ? styles.hoverGuideBox : styles.guideBox}
                onMouseOver={() => {setHover(true)}}
                onMouseLeave={() => {setHover(false)}}>
        <h3 className="nx-text-black nx-font-bold nx-mb-2">{content.title}</h3>
        <p className="nx-text-gray-500 nx-text-sm nx-font-light">{content.description}</p>
      </section>
    } 

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

export default FeatureGuideTabs;
