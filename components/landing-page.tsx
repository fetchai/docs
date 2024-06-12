import React, { useState } from "react";
import styles from "./landing.module.css";
import cardImage from "../src/svgs/card-images.svg";
import { FeatureGuideTabs } from "./feature-guide-tabs";
import Products from "./products";
import { useRouter } from "next/navigation";
import Image from "next/image";
import systemDiagram from "../src/svgs/system-diagram.svg";
import cardStack from "../src/svgs/stack.svg";

function LandingPage() {
  const startingGuides = [
    {
      label: "Building your first agent",
      path: "/guides/agents/installing-uagent",
      image: cardImage,
    },
    {
      label: "Creating an executale function for AI",
      path: "guides/agents/communicating-with-other-agents",
      image: cardImage,
    },
    {
      label: "The Fetch.ai technology stack",
      path: "/guides/agentverse/creating-a-hosted-agent",
      image: cardImage,
    },
  ];
  const courses = [
    {
      title: "Agents 101",
      description:
        "Learn how to do lorem ipsum dolor sit amed Another dolor sit amed consectatur Become a master of agents",
    },
    {
      title: "Agents 101",
      description:
        "Learn how to do lorem ipsum dolor sit amed Another dolor sit amed consectatur Become a master of agents",
    },
  ];

  const CourseStack = ({
    course,
  }: {
    course: { title: string; description: string };
  }) => {
    return (
      <div
        className={styles.cardStack}
        style={{ backgroundImage: `url(${cardStack?.src})` }}
      >
        <div className="nx-flex nx-flex-col nx-items-center nx-gap-3">
          <span className={styles.stackHeading}>Agents 101</span>
          <span className={styles.stackSubHeading}>
            Learn how to do lorem ipsum dolor sit amed Another dolor sit amed
            consectatur Become a master of agents
          </span>
        </div>
      </div>
    );
  };

  const GuideBox = ({
    guide,
  }: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    guide: { label: string; path: string; image: any };
  }) => {
    const router = useRouter();
    const [hover, setHover] = useState<boolean>(false);
    return (
      <div
        className={styles.guideBox}
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
        style={{ backgroundImage: `url(${guide?.image?.src})` }}
      >
        <p className={styles.startGuideText}>{guide.label}</p>
      </div>
    );
  };
  return (
    <section className={styles.page}>
      <div className={styles.headingSection}>
        <p className={styles.welcomeText}>Welcome to</p>
        <p className={styles.mainTitle}>The Fetch.ai developer portal</p>
        <p className={styles.description}>
          Explore our documentation, guides and examples to get to know Fetch.ai
          tools and products. Create an account to claim badges, and take part
          in competitions.
        </p>
      </div>
      <section className="nx-mt-60 landing-page-left-image">
        <p className={styles.subTitle}>Getting Started</p>
        <p className={styles.description}>Explore our guides and examples.</p>
        <div className={styles.startGuides}>
          <div className="nx-grid nx-grid-cols-1 sm:nx-grid-cols-2 md:nx-grid-cols-3 lg:nx-grid-cols-4 nx-gap-8">
            {startingGuides.map((guide, index) => {
              return <GuideBox key={index} guide={guide} />;
            })}
          </div>
        </div>
      </section>
      <hr className={styles.horizontalLine} />
      <section>
        <p className={styles.subTitle}>Our technology loop</p>
        <p className={`${styles.description}  nx-max-w-[900px]`}>
          Fetch.ai is developing a platform to help the development of an AI
          enabled decentralized digital economy. Agents are programs that can
          make choices on their own for individuals, companies, and devices.
          Agents are the actors, and the heart of Fetch.ai ecosystem.
        </p>
        <Image className="nx-py-6" src={systemDiagram} alt="system-diagram" />
        <p className={`${styles.systemDescripton}`}>
          Agents are flexible problem solvers, capable of not just completing
          tasks but also tackling difficult issues across several domains.
          Agents have the adaptability to handle different activities inside the
          decentralized economy, whether it&apos;s improving supply chain
          logistics, maintaining solid record-keeping systems, executing
          computational tasks, or enabling buying and selling interactions.
        </p>
        <p className={`${styles.systemDescripton} nx-mt-10`}>
          Fetch.ai places a high priority on accessibility. Agent technology is
          designed to be inclusive, allowing anybody to create an AI Agent.
          Agents are made possible with the Fetch.ai platform.
        </p>
      </section>
      <hr className={styles.horizontalLine} />
      <section className={styles.courseSection}>
        <div>
          <p className={styles.subTitle}>Courses</p>
          <p className={styles.description}>
            Comprehensive guides for people new to programming and Fetch.ai.
          </p>
        </div>
        <div className=" nx-flex nx-items-center nx-gap-8">
          {courses.map((course, index) => (
            <CourseStack key={index} course={course} />
          ))}
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
