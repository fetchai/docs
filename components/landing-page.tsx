// Example from https://beta.reactjs.org/learn

import { useState } from 'react'
import styles from './landing.module.css'
import Image from 'next/image';
import ColoredCirclesIcon from '../src/images/New search paradigms.png'
import ColoredShapesIcon  from '../src/images/Create new business models.png'
import { ArrowRightIcon } from 'nextra/icons'
import FeatureGuideTabs from './featureGuideTabs';
import Products from './products';

function LandingPage() {

  const startingGuides = [
    'Getting started with Agents',
    'Start communicating with other agents',
    'Build your own chat assistant',
    'Start making revenue with Agents'
  ]

  const GuideBox = ({guide, index}) => {
    return <section className={styles.guideBox}>
       <Image
        src={index%2 == 0 ? ColoredCirclesIcon : ColoredShapesIcon} // Path relative to the `public` folder
        alt="Shapes"
        className={styles.startGuideIcon}
      />
      <p className={styles.startGuideText}></p>
      {guide}
    </section>
  } 
  return (
    <section className={styles.page}>
      <p className={styles.mainTitle}>Documentation</p>
      <p className={styles.description}>Explore our guides and examples to use Fetch</p>
      <section className="nx-mt-60">
        <p className={styles.subTitle}>Getting Started</p>
        <p className={styles.description}>Explore our guides and examples to use Fetch</p>

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
          <div className='nx-flex'>
            <p className={styles.viewMore}>View more</p>
            <ArrowRightIcon/>
          </div>
        </div>
        <p className={styles.description}>Guides are the evergreen documents of the docs, technically focussed (code heavy) explanations of use-cases and concepts.</p>
        <FeatureGuideTabs/>
      </section>
      <section className='nx-mt-160'>
        <p className={styles.subTitle}>Browse by product</p>
        <p className={styles.description}>Drill down to each product in detail</p>
        <Products/>
      </section>
      
    </section>
  )
}

export default function MyApp() {
  return <LandingPage />
}
