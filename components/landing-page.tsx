import React from "react";
import styles from "./landing.module.css";
import Image from "next/image";
import Link from "next/link";
import leading_image from "../src/images/landing/leading/asi1.svg";
import InfoCard from "./info-card";

function LandingPage() {
  return (
    <section className={styles.page}>
      <div className={styles.headingSection}>
        <h1 className="nx-text-[#000] nx-text-[32px]">
          Fetch.ai Developer Platform
        </h1>
        <p className="nx-text-[#000] nx-text-[16px] nx-opacity-60">
          The place where you can find all tutorials and guides needed to
          familiarise with the
          <br />
          concepts and code in a practical way to develop your ideas
          autonomously.
        </p>
      </div>
      <section className="nx-mt-60 nx-flex nx-flex-col nx-gap-12">
        <section>
          <div className="nx-flex nx-flex-col md:nx-flex-row nx-gap-6">
            <Link
              href="https://docs.asi1.ai/docs"
              target="_blank"
              className="nx-flex nx-flex-col nx-w-full nx-bg-position-top nx-rounded-lg nx-h-[384px] nx-p-6 nx-relative md:nx-w-1/2"
              style={{ backgroundImage: `url(${leading_image.src})` }}
            >
              <div className="nx-realtive nx-inset-0 nx-w-full nx-my-auto">
                <Image
                  src="/docs/assets/hover.svg"
                  alt="Chat conversation"
                  width={400}
                  height={110}
                  className="nx-w-full nx-h-auto nx-transition-transform nx-duration-300 hover:nx-scale-105 nx-will-change-transform"
                />
              </div>
              <div className="nx-text-white nx-text-[24px] nx-font-medium nx-mt-auto">
                ASI: One
              </div>
              <div className="nx-text-white nx-text-[12px] nx-mt-[6px] nx-font-medium nx-uppercase geist-mono-font-family">
                World&apos;s first Web3-native LLM designed for Agentic AI.
              </div>
            </Link>
            <div className="nx-w-full nx-gap-6 md:nx-w-1/2 nx-flex nx-flex-col">
              <div className="nx-flex nx-flex-col nx-gap-6 md:nx-flex-row nx-w-full">
                <InfoCard
                  href="https://innovationlab.fetch.ai/resources/docs/examples/chat-protocol/asi1-compatible-uagents"
                  mainTitle="Compatible Agent with Agentverse"
                  firstTitle="buIld 0 → ASI:One"
                  icon="/assets/iconlogo_agentverse.svg"
                />
                <InfoCard
                  href="https://innovationlab.fetch.ai/resources/docs/examples/chat-protocol/asi1-compatible-uagents"
                  mainTitle="Compatible No-code Agents with Flockx"
                  firstTitle="Zero to ASI:One in 60s"
                  icon="/assets/iconlogo_flockx.svg"
                />
              </div>
              <Link
                href="/concepts"
                target="_blank"
                className="nx-w-full boxColor nx-rounded-lg nx-p-6 nx-hover:bg-[#ECEEF1] nx-flex nx-flex-col nx-gap-6 nx-justify-between"
              >
                <div className="nx-rounded-lg nx-w-[48px] nx-h-[48px]">
                  <Image
                    width={48}
                    height={48}
                    src={`/docs/Logo.png`}
                    alt="logo"
                    className="nx-rounded-lg"
                  />
                </div>
                <div className="nx-flex nx-flex-col nx-gap-1">
                  <div className="nx-text-[#000] nx-text-[16px] nx-font-medium">
                    Agentic Search
                  </div>
                  <div className="nx-text-[#000] nx-text-[12px] nx-font-medium nx-uppercase geist-mono-font-family nx-opacity-60 nx-leading-[150%]">
                    provide text for agentic search
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>
        <section>
          <Link
            href="https://innovationlab.fetch.ai/resources"
            target="_blank"
            className="nx-flex nx-gap-1"
          >
            <h2 className="nx-text-[#000] nx-text-[24px]">
              Resources by Innovation Lab
            </h2>

            <Image
              width={14}
              height={14}
              src={`/docs/assets/opne-new-tab-icon.svg`}
              alt="open-in-new-tab-icon"
            />
          </Link>
          <p className="nx-text-[#000] nx-text-[16px] nx-opacity-60 nx-mt-2">
            Jumpstart your ideas: perfect for rapid prototyping, PoCs and
            hackathons
          </p>
          <div className="nx-flex nx-flex-col md:nx-flex-row nx-gap-6 nx-mt-8 nx-w-full">
            <InfoCard
              href="https://innovationlab.fetch.ai/resources/docs/examples/chat-protocol/asi1-compatible-uagents"
              mainTitle="AS1:One"
              firstTitle="Build an Agent Compatible with"
              icon="/assets/iconlogo_asione.svg"
            />
            <InfoCard
              href="https://innovationlab.fetch.ai/resources/docs/examples/adapters/crewai-adapter-example"
              mainTitle="uAgents Adapter"
              firstTitle="crewAI Multi-Agent Ecosystem with"
              icon="/assets/iconlogo_agentverse.svg"
            />
            <InfoCard
              href="https://innovationlab.fetch.ai/resources/docs/examples/on-chain-examples/solana-agents"
              mainTitle="uAgents"
              firstTitle="integrate Solana wallets with"
              icon="/assets/iconlogo_flockx.svg"
            />
          </div>
        </section>

        <section>
          <Link
            href="https://agentverse.ai/"
            target="_blank"
            className="nx-flex nx-gap-1"
          >
            <h2 className="nx-text-[#000] nx-text-[24px]">Agentverse</h2>
            <Image
              width={14}
              height={14}
              src={`/docs/assets/opne-new-tab-icon.svg`}
              alt="open-in-new-tab-icon"
            />
          </Link>
          <p className="nx-text-[#000] nx-text-[16px] nx-opacity-60 nx-mt-2">
            Dev platform for agent registration for search/discovery in ASI:One
            and agent hosting
          </p>
          <div className="nx-flex nx-flex-col md:nx-flex-row nx-gap-6 nx-mt-8 nx-w-full">
            <InfoCard
              href="https://innovationlab.fetch.ai/resources/docs/examples/chat-protocol/asi1-compatible-uagents"
              mainTitle="AS1:One"
              firstTitle="Build an Agent Compatible with"
              icon="/assets/iconlogo_asione.svg"
            />
            <InfoCard
              href="https://innovationlab.fetch.ai/resources/docs/examples/adapters/crewai-adapter-example"
              mainTitle="uAgents Adapter"
              firstTitle="crewAI Multi-Agent Ecosystem with"
              icon="/assets/iconlogo_agentverse.svg"
            />
            <InfoCard
              href="https://innovationlab.fetch.ai/resources/docs/examples/on-chain-examples/solana-agents"
              mainTitle="uAgents"
              firstTitle="integrate Solana wallets with"
              icon="/assets/iconlogo_flockx.svg"
            />
          </div>
        </section>
      </section>
    </section>
  );
}

export default function MyApp() {
  return <LandingPage />;
}
