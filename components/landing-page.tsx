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
import langchain from "../src/svgs/langchain.svg";
import crewai from "../src/svgs/crewai.svg";
import fastapi from "../src/svgs/fastapi.svg";
import { Arrow, vectorPointer, vectorSquare } from "src/icons/shared-icons";

function LandingPage() {
  const comingFromSomewhere = [
    {
      name: "Langchain",
      icon: langchain,
      link: "/guides/quickstart-with/langchain/creating-an-agent-with-langchain",
    },
    {
      name: "FastAPI",
      icon: fastapi,
      link: "/guides/agents/intermediate/rest-endpoints",
    },
    {
      name: "CrewAi",
      icon: crewai,
      link: "/guides/quickstart-with/CrewAI/startup-idea-analyser",
    },
  ];
  const startingGuides = [
    {
      label: "Building your first agent",
      path: "/guides/agents/quickstart",
      image: buildYourAgent,
    },
    {
      label: "Creating an executable function for AI",
      path: "/guides/agents/intermediate/agent-functions",
      image: executable,
    },
    {
      label: "The Fetch.ai technology stack",
      path: "/concepts/introducing-fetchai",
      image: techStack,
    },
  ];

  const courses = [
    {
      title: "Agents 101",
      description:
        "This course is designed to introduce you to the development of Agents, providing a comprehensive guide.",
      path: "/guides/agent-courses/introductory-course",
      image: coursesStack,
      keywords: ["Beginner", "Python", "Courses"],
      vectors: vectorSquare,
    },
    {
      title: "Agents 101 for AI Engine",
      description:
        "This course is designed to introduce you to building Agents that are accessible to the AI Engine.",
      path: "/guides/agent-courses/agents-for-ai",
      image: coursesStackSecond,
      keywords: ["Beginner", "Python", "AI-Engine", "GPT-3.5", "Courses"],
      vectors: vectorPointer,
    },
  ];

  const Keywords = ({ keyword }: { keyword: string }) => (
    <div className={styles.keywordbg}>
      <span className={styles.keywordtext}>{keyword}</span>
    </div>
  );

  const ComingFromSomeWhere = ({
    icon,
    name,
    link,
  }: {
    icon: string;
    name: string;
    link: string;
  }) => {
    const router = useRouter();
    return (
      <div
        onClick={() => router.push(link)}
        className={styles.comingSomewhereWrapper}
      >
        <div className="nx-flex nx-w-full nx-flex-row nx-justify-between">
          <div className="nx-flex nx-flex-row nx-gap-3 ">
            <Image
              src={icon}
              alt="somewhere-img"
              className={styles.comingSomewhereImg}
            />
            <span className={styles.comingSomewhereTitle}>{name}</span>
          </div>
          <p className=" nx-flex nx-justify-center nx-items-center">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.75 7.5625L8.25 12.8125C7.9375 13.0938 7.46875 13.0938 7.1875 12.7812C6.90625 12.4688 6.90625 12 7.21875 11.7188L11.375 7.75H0.75C0.3125 7.75 0 7.4375 0 7C0 6.59375 0.3125 6.25 0.75 6.25H11.375L7.21875 2.3125C6.90625 2.03125 6.90625 1.53125 7.1875 1.25C7.46875 0.9375 7.96875 0.9375 8.25 1.21875L13.75 6.46875C13.9062 6.625 14 6.8125 14 7C14 7.21875 13.9062 7.40625 13.75 7.5625Z"
                fill="#8A9FB8"
              />
            </svg>
          </p>
        </div>
      </div>
    );
  };

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
            id={course.title?.toLowerCase().split(" ").join("-")}
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
        <h1 className={styles.mainTitle}>The Fetch.ai developer portal</h1>
        <p className={styles.description}>
          Explore our documentation, guides and examples to get to know Fetch.ai
          tools and products.
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
        <div className=" nx-flex nx-flex-col nx-gap-3">
          <p className={styles.subDescription}>Coming from somewhere?</p>
          <div className=" nx-grid sm:nx-grid-cols-2 md:nx-grid-cols-3 lg:nx-grid-cols-4 nx-grid-cols-1 nx-w-full nx-gap-3">
            {comingFromSomewhere.map((item, index) => (
              <ComingFromSomeWhere
                link={item.link}
                icon={item.icon}
                name={item.name}
                key={index}
              />
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
