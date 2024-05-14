import React, { useState } from "react";
import styles from "./landing.module.css";
import Image from "next/image";
import AgentverseGettingStartedIcon from "../src/svgs/agentverse-getstarted.svg";
import SystemDiagram from "../src/images/index/simple-system.png";
import { FeatureGuideTabs } from "./feature-guide-tabs";
import Products from "./products";
import { useRouter } from "next/navigation";

function LandingPage() {
  const startingGuides = [
    {
      label: "Building your first agent",
      path: "/guides/agents/installing-uagent",
    },
    {
      label: "Creating an executale function for AI",
      path: "guides/agents/communicating-with-other-agents",
    },
    {
      label: "The Fetch.ai technology stack",
      path: "/guides/agentverse/creating-a-hosted-agent",
    },
  ];

  const beginnerGuides = [
    {
      label: "Agents 101 🤖",
      path: "/guides/agent-courses/introductory-course",
      icon: AgentverseGettingStartedIcon,
    },
    {
      label: "Agents 101 for AI Engine",
      path: "/guides/agent-courses/agents-for-ai",
      icon: AgentverseGettingStartedIcon,
    },
  ];

  const GuideBox = ({
    guide,
  }: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    guide: { label: string; path: string };
  }) => {
    const router = useRouter();
    const [hover, setHover] = useState<boolean>(false);

    return (
      <div
        className={hover ? styles.hoverGuideBox : styles.guideBox}
        onClick={() => {
          router.push(guide.path);
        }}
        onMouseOver={() => {
          setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
        id={guide.label.toLowerCase().split(" ").join("-")}
      >
        <div className={styles.startGuideText}>{guide.label}</div>
      </div>
    );
  };
  return (
    <section className={styles.page}>
      <p className={styles.mainTitle}>
        Welcome to the Fetch.ai developer portal
      </p>
      <p className={styles.description}>
        Explore our documentation, guides and examples to get to know Fetch.ai
        tools and products. Create an account to claim badges, and take part in
        competitions.
      </p>
      <section className="nx-mt-60 landing-page-left-image">
        <p className={styles.subTitle}>Getting Started</p>
        <p className={styles.description}>Explore our guides and examples.</p>

        <div className="nx-grid nx-grid-cols-3 sm:nx-grid-cols-2 md:nx-grid-cols-3 nx-gap-4">
          {startingGuides.map((guide, index) => {
            return <GuideBox key={index} guide={guide} />;
          })}
        </div>
      </section>

      <section className="nx-mt-60">
        <p className={styles.subTitle}>Our technology loop</p>
        <p className={styles.description}>
          Comprehensive guides for people new to programming and Fetch.ai.
        </p>

        <Image src={SystemDiagram} alt="system" />
      </section>

      <section className="nx-mt-60">
        <p className={styles.subTitle}>Courses</p>
        <p className={styles.description}>
          Comprehensive guides for people new to programming and Fetch.ai.
        </p>

        <div className={styles.startGuides}>
          <div className="nx-grid nx-grid-cols-1 sm:nx-grid-cols-2 md:nx-grid-cols-3 lg:nx-grid-cols-4 nx-gap-4">
            {beginnerGuides.map((guide, index) => {
              return <GuideBox key={index} guide={guide} />;
            })}
          </div>
        </div>
      </section>

      <section className="nx-mt-landing-page-sections">
        <div className="nx-flex nx-justify-between">
          <p className={styles.subTitle}>Featured Guides</p>
        </div>
        <p className={styles.description}>
          Guides are technically focused explanations of use-cases and concepts.
        </p>
        <FeatureGuideTabs />
      </section>
      <section className="nx-mt-landing-page-sections">
        <p className={styles.subTitle}>Browse by product</p>
        <p className={styles.description}>
          Click on each product for additional details.
        </p>
        <Products />
      </section>
    </section>
  );
}

export default function MyApp() {
  return <LandingPage />;
}
