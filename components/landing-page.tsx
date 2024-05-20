import React, { useState } from "react";
import styles from "./landing.module.css";
import Image from "next/image";
import AgentverseGettingStartedIcon from "../src/svgs/agentverse-getstarted.svg";
import SystemDiagram from "../src/images/index/simple-system.png";
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
    v,
    height,
  }: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    guide: { label: string; path: string };
    v: number;
    height: string;
  }) => {
    const router = useRouter();
    const [hover, setHover] = useState<boolean>(false);

    const backgroundTransitions: string[] = [
      "phaseOne",
      "phaseTwo",
      "phaseThree",
    ];

    const guideBox =
      "nx-relative nx-p-8 nx-rounded-lg " +
      backgroundTransitions[v] +
      " " +
      height;

    const hoverGuideBox =
      "nx-relative nx-p-8  nx-rounded nx-bg-blue-200 " + height;

    return (
      <div
        className={`${hover ? hoverGuideBox : guideBox} nx-cursor-pointer`}
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
      <section className="nx-mt-12">
        <p className={styles.subTitle}>Getting Started</p>
        <p className={styles.description}>Explore our guides and examples.</p>

        <div className="nx-grid nx-grid-cols-1 sm:nx-grid-cols-2 md:nx-grid-cols-3 nx-gap-4">
          {startingGuides.map((guide, index) => {
            return (
              <GuideBox key={index} guide={guide} v={index} height="nx-h-72" />
            );
          })}
        </div>
      </section>

      <section className="nx-mt-60">
        <p className={styles.subTitle}>Our technology loop</p>
        <div className={styles.description}>
          <p>
            Fetch.ai is developing a platform to help the development of an AI
            enabled decentralized digital economy. Agents are programs that can
            make choices on their own for individuals, companies, and devices.
            Agents are the actors, and the heart of Fetch.ai ecosystem.{" "}
          </p>

          <p>
            Agents are flexible problem solvers, capable of not just completing
            tasks but also tackling difficult issues across several domains.
            Agents have the adaptability to handle different activities inside
            the decentralized economy, whether it&apos;s improving supply chain
            logistics, maintaining solid record-keeping systems, executing
            computational tasks, or enabling buying and selling interactions.
          </p>

          <p>
            Fetch.ai places a high priority on accessibility. Agent technology
            is designed to be inclusive, allowing anybody to create an AI Agent.
            Agents are made possible with the Fetch.ai platform.
          </p>
        </div>

        <Image
          className=" nx-my-12"
          draggable={false}
          src={SystemDiagram}
          alt="system"
        />
      </section>

      <section className="">
        <p className={styles.subTitle}>Courses</p>
        <p className={styles.description}>
          Comprehensive guides for people new to programming and Fetch.ai.
        </p>
        <div className={styles.startGuides}>
          <div className="nx-grid nx-grid-cols-1 sm:nx-grid-cols-2 md:nx-grid-cols-2 nx-gap-4">
            {beginnerGuides.map((guide, index) => {
              return (
                <GuideBox
                  key={index}
                  guide={guide}
                  v={index}
                  height="nx-h-40"
                />
              );
            })}
          </div>
        </div>
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
