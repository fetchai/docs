import React from "react";
import styles from "./landing.module.css";
import Link from "next/link";
import leading_image from "../src/images/landing/leading/asi1.svg";
import leading_image_2a from "../src/images/landing/leading/2.jpg";
import leading_image_2b from "../src/images/landing/leading/asi1.svg";
import leading_image_2c from "../src/images/landing/leading/4.jpg";

function LandingPage() {
  return (
    <section className={styles.page}>
      <div className={styles.headingSection}>
        <h1 className="nx-text-[#000] nx-text-[32px]">
          Fetch.ai Developer Platform
        </h1>
        <p className="nx-text-[#000] nx-text-[16px] nx-opacity-60">
          The place where you can find all tutorials and guides needed to
          familiarise with the concepts and code in a practical way to develop
          your ideas autonomously.
        </p>
      </div>
      <section className="nx-mt-60">
        <div className="nx-flex nx-flex-wrap sm:nx-flex-nowrap sm:nx-h-[332px] nx-gap-6">
          <Link
            href="www.google.com"
            target="_blank"
            className="nx-flex nx-flex-col nx-w-full boxColor nx-rounded-lg nx-p-4 nx-h-[332px] nx-p-3 nx-relative nx-bg-center  sm:nx-w-1/2  "
            style={{ backgroundImage: `url(${leading_image.src})` }}
          >
            <div className="nx-flex-1"></div>
            <div className="nx-text-[#000] nx-text-[24px] nx-font-medium">
              ASI: One
            </div>
            <div className="nx-text-[#000] nx-text-[12px] nx-font-medium nx-uppercase">
              World&apos;s first Web3-native LLM designed for Agentic AI.
            </div>
          </Link>
          <div className="nx-grid nx-w-full nx-grid-cols-1 sm:nx-grid-cols-2 nx-gap-6 sm:nx-w-[50%] nx-grid-rows-[214px,1fr] nx-rounded-lg">
            <Link
              href="www.google.com"
              target="_blank"
              className="nx-col-span-1 nx-block boxColor nx-rounded-lg nx-p-4 nx-hover:bg-[#ECEEF1] flex nx-flex-col nx-items-center"
            >
              <div className="nx-left-2 nx-m-2 nx-text-[#000] nx-text-[20px] nx-font-medium">
                Connect to ASI:One with uAgents
              </div>
            </Link>

            <Link
              href="www.google.com"
              target="_blank"
              className="nx-col-span-1 nx-block boxColor nx-rounded-lg nx-p-4 nx-hover:bg-[#ECEEF1] flex nx-flex-col nx-items-center"
            >
              <div className="nx-m-2 nx-text-[#000] nx-text-[20px] nx-font-medium">
                ASI-1 Agents
              </div>
            </Link>

            <Link
              href="/concepts"
              target="_blank"
              className="nx-col-span-1 sm:nx-col-span-2 nx-block boxColor nx-rounded-lg nx-p-4 nx-hover:bg-[#ECEEF1] nx-flex nx-flex-col nx-justify-center"
            >
              <div className="nx-text-[#000] nx-text-[20px] nx-font-medium">
                What is Fetch.ai
              </div>
              <div className="nx-text-[#000] nx-text-[12px] nx-font-medium nx-uppercase">
                Breaking down the components and ecosystem of fetch.ai
              </div>
            </Link>
          </div>
        </div>

        <div className="nx-mt-[48px]">
          <div className="nx-text-[24px] nx-font-medium">AI Agents</div>
          <div>
            Secure communication and a robust network to build excellent
            autonomous agents.
          </div>
        </div>
        <div className={styles.startGuides}>
          <div className="nx-grid nx-grid-cols-1 nx-w-full sm:nx-grid-cols-2 md:nx-grid-cols-3 lg:nx-grid-cols-3 nx-gap-6 sm:nx-h-[270px]">
            <Link
              href="www.google.com"
              target="_blank"
              className="nx-col-span-1 nx-block boxColor nx-rounded-lg nx-p-4 nx-hover:bg-[#ECEEF1] flex nx-flex-col nx-relative nx-bg-center  nx-items-center"
              style={{ backgroundImage: `url(${leading_image_2a.src})` }}
            >
              <div className="nx-text-[#000] nx-text-[12px] nx-font-medium nx-uppercase">
                Getting started with
              </div>
              <div className=" nx-text-[#000] nx-text-[20px] nx-font-medium">
                Agentverse
              </div>
            </Link>

            <Link
              href="www.google.com"
              target="_blank"
              className="nx-col-span-1 nx-block boxColor nx-rounded-lg nx-p-4 nx-hover:bg-[#ECEEF1] flex nx-flex-col nx-relative nx-bg-center  nx-items-center"
              style={{ backgroundImage: `url(${leading_image_2b.src})` }}
            >
              <div className="nx-text-[#000] nx-text-[12px] nx-font-medium nx-uppercase">
                Getting started with
              </div>
              <div className=" nx-text-[#000] nx-text-[20px] nx-font-medium">
                ASI-1
              </div>
            </Link>

            <Link
              href="www.google.com"
              target="_blank"
              className="nx-col-span-1 nx-block boxColor nx-rounded-lg nx-p-4 nx-hover:bg-[#ECEEF1] flex nx-flex-col nx-relative nx-bg-center  nx-items-center"
              style={{ backgroundImage: `url(${leading_image_2c.src})` }}
            >
              <div className="nx-text-[#000] nx-text-[12px] nx-font-medium nx-uppercase">
                Getting started with
              </div>
              <div className="nx-text-[#000] nx-text-[20px] nx-font-medium">
                uAgents
              </div>
            </Link>
          </div>
        </div>

        <div className="nx-mt-[48px]">
          <div className="nx-text-[24px] nx-font-medium">uAgents</div>
          <div>
            Python library for dyanmic Multiagent systems and AI Agents, made
            simple.
          </div>
        </div>

        <div className={styles.startGuides}>
          <div className="nx-grid nx-grid-cols-1 nx-w-full sm:nx-grid-cols-2 md:nx-grid-cols-4 lg:nx-grid-cols-4 nx-gap-6 sm:nx-h-[270px]">
            <Link
              href="www.google.com"
              target="_blank"
              className="nx-col-span-1 nx-block boxColor nx-rounded-lg nx-p-4 nx-hover:bg-[#ECEEF1] flex nx-flex-col nx-items-center"
            >
              <div className="nx-text-[#000] nx-text-[12px] nx-font-medium nx-uppercase">
                Build a simple
              </div>
              <div className="nx-text-[#000] nx-text-[20px] nx-font-medium">
                RAG agent
              </div>
            </Link>

            <Link
              href="www.google.com"
              target="_blank"
              className="nx-col-span-1 nx-block boxColor nx-rounded-lg nx-p-4 nx-hover:bg-[#ECEEF1] flex nx-flex-col nx-items-center"
            >
              <div className="nx-text-[#000] nx-text-[12px] nx-font-medium nx-uppercase">
                Getting started with
              </div>
              <div className="nx-text-[#000] nx-text-[20px] nx-font-medium">
                ChatProtocol
              </div>
            </Link>

            <Link
              href="www.google.com"
              target="_blank"
              className="nx-col-span-1 nx-block boxColor nx-rounded-lg nx-p-4 nx-hover:bg-[#ECEEF1] flex nx-flex-col nx-items-center"
            >
              <div className="nx-text-[#000] nx-text-[12px] nx-font-medium nx-uppercase">
                Utilise
              </div>
              <div className="nx-text-[#000] nx-text-[20px] nx-font-medium">
                Agent Mailbox
              </div>
            </Link>

            <Link
              href="www.google.com"
              target="_blank"
              className="nx-col-span-1 nx-block boxColor nx-rounded-lg nx-p-4 nx-hover:bg-[#ECEEF1] flex nx-flex-col nx-items-center"
            >
              <div className="nx-text-[#000] nx-text-[12px] nx-font-medium nx-uppercase">
                Build a simple
              </div>
              <div className="nx-text-[#000] nx-text-[20px] nx-font-medium">
                Multi Agent System
              </div>
            </Link>
          </div>
        </div>

        <div className="nx-mt-[48px]">
          <div className="nx-text-[24px] nx-font-medium">Agentverse</div>
          <div>For simple agent hosting and management</div>
        </div>

        <div className={styles.startGuides}>
          <div className="nx-grid nx-grid-cols-1 nx-w-full sm:nx-grid-cols-2 md:nx-grid-cols-2 lg:nx-grid-cols-2 nx-gap-6 ">
            <Link
              href="www.google.com"
              target="_blank"
              className="nx-col-span-1 nx-block boxColor nx-rounded-lg nx-p-4 nx-hover:bg-[#ECEEF1] nx-flex-col nx-items-center nx-h-[270px]"
            >
              <div className="nx-text-[#000] nx-text-[12px] nx-font-medium nx-uppercase">
                Getting started with
              </div>
              <div className="nx-text-[#000] nx-text-[20px] nx-font-medium">
                Agentverse Templates
              </div>
            </Link>

            <Link
              href="www.google.com"
              target="_blank"
              className="nx-col-span-1 nx-block boxColor nx-rounded-lg nx-p-4 nx-hover:bg-[#ECEEF1] nx-flex-col nx-items-center nx-h-[270px]"
            >
              <div className="nx-text-[#000] nx-text-[12px] nx-font-medium nx-uppercase">
                Test your agent with agentverse
              </div>
              <div className="nx-text-[#000] nx-text-[20px] nx-font-medium">
                Chat
              </div>
            </Link>

            <Link
              href="www.google.com"
              target="_blank"
              className="nx-col-span-1 nx-block boxColor nx-rounded-lg nx-p-4 nx-hover:bg-[#ECEEF1]  nx-flex-col nx-items-center nx-h-[270px]"
            >
              <div className="nx-text-[#000] nx-text-[12px] nx-font-medium nx-uppercase">
                A SIMPLE guide to help you
              </div>
              <div className="nx-text-[#000] nx-text-[20px] nx-font-medium">
                Deploy and host your agents
              </div>
            </Link>

            <Link
              href="www.google.com"
              target="_blank"
              className="nx-col-span-1 nx-block boxColor nx-rounded-lg nx-p-4 nx-hover:bg-[#ECEEF1]  nx-flex-col nx-items-center nx-h-[270px]"
            >
              <div className="nx-text-[#000] nx-text-[12px] nx-font-medium nx-uppercase">
                Search and discover agents with
              </div>
              <div className="nx-text-[#000] nx-text-[20px] nx-font-medium">
                The Marketplace
              </div>
            </Link>
          </div>
        </div>

        <div className="nx-mt-[48px]">
          <div className="nx-text-[24px] nx-font-medium">Network</div>
          <div>Smart contracts and agent payments.</div>
        </div>
        <div className={styles.startGuides}>
          <div className="nx-grid nx-grid-cols-1 nx-w-full sm:nx-grid-cols-2 md:nx-grid-cols-2 lg:nx-grid-cols-2 nx-gap-6">
            <Link
              href="www.google.com"
              target="_blank"
              className="nx-flex boxColor nx-rounded-lg nx-p-4 nx-hover:bg-[#ECEEF1] nx-flex nx-flex-col nx-justify-center nx-h-[96px] nx-gap-2"
            >
              <div className="nx-text-[#000] nx-text-[20px] nx-font-medium ">
                Ledger
              </div>
              <div className="nx-text-[#000] nx-text-[12px] nx-font-medium nx-uppercase ">
                Search and discover agents with
              </div>
            </Link>

            <Link
              href="www.google.com"
              target="_blank"
              className="nx-flex boxColor nx-rounded-lg nx-p-4 nx-hover:bg-[#ECEEF1] nx-flex nx-flex-col nx-justify-center nx-h-[96px] nx-gap-2"
            >
              <div className="nx-text-[#000] nx-text-[20px] nx-font-medium ">
                Almanac
              </div>
              <div className="nx-text-[#000] nx-text-[12px] nx-font-medium nx-uppercase ">
                Public contract fo all agents
              </div>
            </Link>

            <Link
              href="www.google.com"
              target="_blank"
              className="nx-flex boxColor nx-rounded-lg nx-p-4 nx-hover:bg-[#ECEEF1] nx-flex nx-flex-col nx-justify-center nx-h-[96px] nx-gap-2"
            >
              <div className="nx-text-[#000] nx-text-[20px] nx-font-medium ">
                Cosmpy
              </div>
              <div className="nx-text-[#000] nx-text-[12px] nx-font-medium nx-uppercase ">
                Python library for cosmos based blockchains
              </div>
            </Link>

            <Link
              href="www.google.com"
              target="_blank"
              className="nx-flex boxColor nx-rounded-lg nx-p-4 nx-hover:bg-[#ECEEF1] nx-flex nx-flex-col nx-justify-center nx-h-[96px] nx-gap-2"
            >
              <div className="nx-text-[#000] nx-text-[20px] nx-font-medium ">
                Wallet
              </div>
              <div className="nx-text-[#000] nx-text-[12px] nx-font-medium nx-uppercase ">
                TOKEN management and agent interaction
              </div>
            </Link>
          </div>
        </div>
      </section>
    </section>
  );
}

export default function MyApp() {
  return <LandingPage />;
}
