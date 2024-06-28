import React, { useState } from "react";
import styles from "./landing.module.css";
import buildYourAgent from "../src/svgs/build-your-agent.svg";
import executable from "../src/svgs/executable.svg";
import techStack from "../src/svgs/tech-stack.svg";
import Products from "./products";
import { useRouter } from "next/navigation";
import Image from "next/image";
import systemDiagram from "../src/svgs/system-diagram.svg";
import coursesStack from "../src/svgs/courses-stack.svg";
import coursesStackSecond from "../src/svgs/courses-stack-second.svg";
import { Arrow, vectorPointer, vectorSquare } from "src/icons/shared-icons";

function LandingPage() {
  const startingGuides = [
    {
      label: "Building your first agent",
      path: "/guides/agents/installing-uagent",
      image: buildYourAgent,
    },
    {
      label: "Creating an executable function for AI",
      path: "guides/agents/communicating-with-other-agents",
      image: executable,
    },
    {
      label: "The Fetch.ai technology stack",
      path: "/guides/agentverse/creating-a-hosted-agent",
      image: techStack,
    },
  ];

  const courses = [
    {
      title: "Agents 101",
      description:
        "This course is designed to introduce you to the development of Agents, providing a comprehensive guide",
      path: "/guides/agent-courses/introductory-course",
      image: coursesStack,
      keywords: ["beginner", "python"],
      vectors: vectorSquare,
    },
    {
      title: "Agents 101 for AI Engine",
      description:
        "This course is designed to introduce you to building agents that are accessible to the AI Engine.",
      path: "/guides/agent-courses/agents-for-ai",
      image: coursesStackSecond,
      keywords: ["novice", "python", "ai-engine", "gpt-3.5"],
      vectors: vectorPointer,
    },
  ];

  const Keywords = ({ keyword }: { keyword: string }) => (
    <div className={styles.keywordbg}>
      <span className={styles.keywordtext}>{keyword}</span>
    </div>
  );

  const CourseStack = ({
    course,
    index,
  }: {
    index: number;
    course: {
      title: string;
      description: string;
      path: string;
      image: { src: string };
      keywords: string[];
      vectors: () => React.JSX.Element;
    };
  }) => {
    const router = useRouter();
    const vectorClassName = index === 1 ? styles.vectorCustom : styles.vector;
    return (
      <div
        style={{ backgroundImage: `url(${course.image.src})` }}
        className={styles.cardStack}
      >
        <div className="nx-flex nx-flex-col nx-items-center nx-justify-center sm:nx-gap-[100px] nx-gap-6">
          <span className={styles.introduction}>
            fetch.ai introduction series
          </span>
          <div className="nx-flex nx-gap-10 nx-items-center nx-flex-col nx-justify-center">
            <span className={styles.stackHeading}>{course.title}</span>
            <div className="nx-flex nx-gap-2 nx-flex-wrap nx-justify-center">
              {course?.keywords?.map((keyword, index) => (
                <Keywords key={index} keyword={keyword} />
              ))}
            </div>
          </div>
        </div>
        <div className="nx-relative nx-flex nx-w-full">
          <button
            onClick={() => {
              router.push(course.path);
            }}
            className="button-primary nx-w-full nx-text-white"
          >
            <span className="nx-w-full nx-text-nowrap">Start the course</span>
          </button>
          <span className={vectorClassName}>{course.vectors()}</span>
        </div>
      </div>
    );
  };

  const GuideBox = ({
    guide,
  }: {
    guide: { label: string; path: string; image: { src: string } };
  }) => {
    const router = useRouter();
    const [hover, setHover] = useState<boolean>(false);
    return (
      <div
        className={hover ? styles.hoverGuideBox : styles.guideBox}
        id={guide.label.toLowerCase().split(" ").join("-")}
        style={{ backgroundImage: `url(${guide.image.src})` }}
        onClick={() => {
          router.push(guide.path);
        }}
        onMouseOver={() => {
          setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
      >
        <div className="nx-flex nx-flex-col nx-h-full nx-justify-between">
          <p className={styles.startGuideText}>{guide.label}</p>
          <span className={styles.next}>
            <Arrow />
          </span>
        </div>
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
      <section className="nx-mt-60">
        <p className={styles.subTitle}>Getting Started</p>
        <p className={styles.subDescription}>
          Explore our guides and examples.
        </p>
        <div className={styles.startGuides}>
          <div className="nx-grid nx-grid-cols-1 nx-w-full sm:nx-grid-cols-2 md:nx-grid-cols-3 lg:nx-grid-cols-3 nx-gap-8">
            {startingGuides.map((guide, index) => (
              <GuideBox key={index} guide={guide} />
            ))}
          </div>
        </div>
      </section>
      <hr className={styles.horizontalLine} />
      <section>
        <p className={styles.subTitle}>Our technology loop</p>
        <p className={styles.systemDescripton}>
          Fetch.ai is developing a platform to help the development of an AI
          enabled decentralized digital economy. Agents are programs that can
          make choices on their own for individuals, companies, and devices.
          Agents are the actors, and the heart of Fetch.ai ecosystem.
        </p>
        <Image className="nx-py-6" src={systemDiagram} alt="system-diagram" />
        <p className={styles.systemDescripton}>
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
          <p className={styles.coursesHeading}>Courses</p>
          <p className={styles.coursesSubtitle}>
            Comprehensive guides for people new to programming and Fetch.ai.
          </p>
        </div>
        <div className="nx-flex nx-items-center nx-justify-center nx-w-full md:nx-flex-row nx-flex-col nx-gap-8">
          {courses.map((course, index) => (
            <CourseStack key={index} index={index} course={course} />
          ))}
        </div>
      </section>
      <section className="nx-mt-landing-page-sections">
        <p className={styles.subTitle}>Browse by product</p>
        <p className={styles.subDescription}>
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
