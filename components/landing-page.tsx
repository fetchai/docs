// Example from https://beta.reactjs.org/learn

import { useState } from 'react'
import styles from './landing.module.css'
import Image from 'next/image';
import ColoredCirclesIcon from '../src/images/New search paradigms.png'
import ColoredShapesIcon  from '../src/images/Create new business models.png'
import { FeatureGuideTabs } from './featureGuideTabs';
import Products from './products';
import { useRouter } from 'next/navigation'


function LandingPage() {

     const startingGuides = [
         {
             label: 'Getting started with Agents 🛠️📲',
             path: '/guides/agents/installing-uagent'
         },
         {
             label: 'Start communicating with other agents 📱🤖',
             path: 'guides/agents/communicating-with-other-agents'
         },
         {
             label: 'How to use μAgents to send tokens 📊💸',
             path: 'guides/agents/send-tokens'
         },
             {
             label: 'How to use μAgents to verify messages 📬🔐',
             path: 'guides/agents/message-verification'
         },
        ];



  const GuideBox = ({guide, index}) => {
        const router = useRouter()
        const [hover, setHover] = useState<boolean>(false);

    return <div className={hover ? styles.hoverGuideBox : styles.guideBox}
                onClick={() => {router.push(guide.path)}}
                onMouseOver={() => {setHover(true)}}
                onMouseLeave={() => {setHover(false)}}
                >
       <Image
        src={index%2 == 0 ? ColoredCirclesIcon : ColoredShapesIcon} // Path relative to the `public` folder
        alt="Shapes"
        className={styles.startGuideIcon}
      />
      <p className={styles.startGuideText}></p>
      {guide.label}
    </div>
  } 
  return (
    <section className={styles.page}>
      <p className={styles.mainTitle}>Documentation</p>
      <p className={styles.description}>Explore our documentation, guides and examples to get to know Fetch.ai tools and products.</p>
      <section className="nx-mt-60 landing-page-left-image">
        <p className={styles.subTitle}>Getting Started</p>
        <p className={styles.description}>Explore our guides and examples.</p>

        <div className={styles.startGuides}>
          <div className="nx-grid nx-grid-cols-1 sm:nx-grid-cols-2 md:nx-grid-cols-3 lg:nx-grid-cols-4 nx-gap-4">
            {
              startingGuides.map((guide, index) => {
                return <GuideBox guide={guide} index={index}/>
              })
            }
          </div>
        </div>
      </section>

      <section className='nx-mt-160'>
        <div className='nx-flex nx-justify-between'>
          <p className={styles.subTitle}>Featured Guides</p>
        </div>
        <p className={styles.description}>Guides are the evergreen documents of the docs, technically focused explanations of use-cases and concepts.</p>
        <FeatureGuideTabs/>
      </section>
      <section className='nx-mt-160'>
        <p className={styles.subTitle}>Browse by product</p>
        <p className={styles.description}>Click on each product for additional details.</p>
        <Products/>
      </section>
      
    </section>
  )
}

export default function MyApp() {
  return <LandingPage />
}
