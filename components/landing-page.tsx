import React from "react";
import styles from "./landing.module.css";
import Image from "next/image";
import Link from "next/link";
import leading_image from "../src/images/landing/leading/asi1.svg";
import InfoCard from "./info-card";
import InfoImageCard from "./info-image-card";

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
            href="https://agentverse.ai/docs"
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
            <InfoImageCard
              href="https://agentverse.ai/docs/templates"
              mainTitle="Agentverse Templates"
              firstTitle="Explore, ideate, and learn WITH"
              image="/assets/agentverse_templates.svg"
            />
            <InfoImageCard
              href="https://agentverse.ai/docs/templates"
              mainTitle="Agentverse Chat"
              firstTitle="Test your agent in isolation with"
              image="/assets/agentverse_chat.svg"
            />
          </div>
          <div className="nx-flex nx-flex-col md:nx-flex-row nx-gap-6 nx-mt-6 nx-w-full">
            <InfoImageCard
              href="https://agentverse.ai/docs/quickstart"
              mainTitle="Deploy and host your agents"
              firstTitle="A simple guide to help you"
              image="/assets/agentverse_deployhost.svg"
            />
            <InfoImageCard
              href="https://agentverse.ai/docs/marketplace"
              mainTitle="The Marketplace"
              firstTitle="Search and Discover AGENTS with"
              image="/assets/agentverse_marketplace.svg"
            />
          </div>
        </section>

        <section>
          <Link
            href="https://docs.flockx.io/home"
            target="_blank"
            className="nx-flex nx-gap-1"
          >
            <h2 className="nx-text-[#000] nx-text-[24px]">Flockx</h2>
            <Image
              width={14}
              height={14}
              src={`/docs/assets/opne-new-tab-icon.svg`}
              alt="open-in-new-tab-icon"
            />
          </Link>
          <p className="nx-text-[#000] nx-text-[16px] nx-opacity-60 nx-mt-2">
            Multiagent systems made simple with
          </p>
          <div className="nx-flex nx-flex-col md:nx-flex-row nx-gap-6 nx-mt-8 nx-w-full">
            <InfoImageCard
              href="https://agentverse.ai/docs/templates"
              mainTitle="No-code Agent Studio"
              firstTitle="Text to be provided"
              image="/assets/agentverse_templates.svg"
            />
            <InfoImageCard
              href="https://agentverse.ai/docs/templates"
              mainTitle="Knowledge Management"
              firstTitle="Text to be provided"
              image="/assets/agentverse_chat.svg"
            />
          </div>
          <div className="nx-flex nx-flex-col md:nx-flex-row nx-gap-6 nx-mt-6 nx-w-full">
            <InfoImageCard
              href="https://agentverse.ai/docs/quickstart"
              mainTitle="Integrations & Deployments"
              firstTitle="Text to be provided"
              image="/assets/agentverse_templates.svg"
            />
            <InfoImageCard
              href="https://agentverse.ai/docs/marketplace"
              mainTitle="Multi-agent Collaboration"
              firstTitle="Text to be provided"
              image="/assets/agentverse_templates.svg"
            />
          </div>
        </section>

        <section>
          <Link
            href="https://innovationlab.fetch.ai/resources/docs/1.0.2/agent-creation/uagent-creation"
            target="_blank"
            className="nx-flex nx-gap-1"
          >
            <h2 className="nx-text-[#000] nx-text-[24px]">uAgents</h2>
            <Image
              width={14}
              height={14}
              src={`/docs/assets/opne-new-tab-icon.svg`}
              alt="open-in-new-tab-icon"
            />
          </Link>
          <p className="nx-text-[#000] nx-text-[16px] nx-opacity-60 nx-mt-2">
            Multiagent systems made simple with
          </p>
          <div className="nx-flex nx-flex-col md:nx-flex-row nx-gap-6 nx-mt-8 nx-w-full">
            <InfoCard
              href="https://innovationlab.fetch.ai/resources/docs/1.0.2/examples/other-frameworks/financial-analysis-ai-agent#b-rag-chain-chainpy"
              mainTitle="RAG agent"
              firstTitle="BUILD A SIMPLE"
              icon="/assets/icon_ragagent.svg"
            />
            <InfoCard
              href="https://innovationlab.fetch.ai/resources/docs/examples/adapters/crewai-adapter-example"
              mainTitle="ChatProtocol"
              firstTitle="GETTING STARTED WITH"
              icon="/assets/icon_chatprotocol.svg"
            />
            <InfoCard
              href="https://innovationlab.fetch.ai/resources/docs/examples/on-chain-examples/solana-agents"
              mainTitle="Agent Mailbox"
              firstTitle="Utilise"
              icon="/assets/icon_mailbox.svg"
            />
            <InfoCard
              href="https://innovationlab.fetch.ai/resources/docs/examples/on-chain-examples/solana-agents"
              mainTitle="Multi Agent System"
              firstTitle="BUILD A SIMPLE"
              icon="/assets/icon_multiagentsystem.svg"
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
