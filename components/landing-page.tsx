import React from "react";
import styles from "./landing.module.css";
import Link from "next/link";
import leading_image from '../src/images/landing/bg.svg'
import asi_icon from '../src/images/landing/asi.svg'
import hotel from '../src/images/landing/eds_luxury_hotel.svg'
import conversation from '../src/images/landing/Conversation.svg'
import context from '../src/images/landing/agentcontext.png'
import marketplace from '../src/images/landing/marketplace.png'
import Image from "next/image";


function LandingPage() {
  return (
    <section className={styles.page}>
      <div className={styles.headingSection}>
        <h1 className={styles.mainTitle}>The Fetch.ai developer portal</h1>
        <p className={styles.description}>
          The place where you can find all tutorials and guides needed to familiarise with the concepts and code in a practical way to develop your ideas autonomously.
        </p>
      </div>
        <section className="nx-mt-60">

            <div className="nx-flex nx-items-stretch nx-flex-wrap sm:nx-flex-nowrap   nx-gap-6">
                <Link
                        href="www.google.com"
                        target="_blank"
                        className="nx-flex nx-flex-1 nx-flex-col nx-w-full boxColor nx-rounded-lg nx-p-4 nx-h-full nx-p-3 nx-relative nx-bg-center  sm:nx-w-1/2 sm:nx-h-[356px]  "
                        style={{ backgroundImage: `url(${leading_image.src})`, height: "unset"}} >
                        <div className="nx-flex-1"></div>
                        <div className="nx-text-white nx-text-[24px] nx-font-medium">ASI: One</div>
                        <div className="nx-text-white nx-text-[12px] nx-font-medium nx-uppercase">World&apos;s first
                            Web3-native LLM designed for Agentic AI.
                        </div>

                </Link>
                <div className="nx-grid nx-w-full nx-grid-cols-1 sm:nx-grid-cols-2 nx-gap-6 nx-justify-center sm:nx-w-[50%]  nx-rounded-lg">


                    <Link
                        href="www.google.com"
                        target="_blank"
                        className="nx-col-span-1 nx-block boxColor nx-rounded-lg nx-hover:bg-[#ECEEF1] nx-flex nx-flex-col nx-justify-center nx-gap-[24px] nx-p-[24px]"
                    >
                        <Image src={asi_icon} alt="asi icon"/>
                        <div>
                        <div className="nx-text-white nx-text-[12px] nx-font-medium nx-uppercase">Getting started with
                        </div>
                        <div className=" nx-text-white nx-text-16px] nx-font-medium">FET token</div>
                        </div>
                    </Link>

                    <Link href="www.google.com" target="_blank"
                              className="nx-col-span-1 nx-block boxColor nx-rounded-lg nx-hover:bg-[#ECEEF1] nx-flex nx-flex-col nx-justify-center nx-gap-[24px] nx-p-[24px]"
                    >
                        <Image src={asi_icon} alt="asi icon"/>
                        <div>
                            <div className="nx-text-white nx-text-[12px] nx-font-medium nx-uppercase">Create your first</div>
                            <div className="nx-text-white nx-text-[16px] nx-font-medium">ASI-1 Agent</div>
                        </div>
                    </Link>

                    <Link href="/concepts" target="_blank"
                          className="nx-col-span-1 sm:nx-col-span-2 nx-block boxColor nx-rounded-lg nx-gap-[24px] nx-p-[24px] nx-hover:bg-[#ECEEF1] nx-flex nx-flex-col nx-justify-center"
                    >      <Image src={asi_icon} alt="asi icon"/>
                        <div>
                        <div className="nx-text-white nx-text-[16px] nx-font-medium">What is Fetch.ai</div>
                        <div className="nx-text-white nx-text-[12px] nx-font-medium nx-uppercase">Breaking down the components and ecosystem of fetch.ai
                        </div>
                        </div>
                    </Link>
                </div>
            </div>

            <div className="nx-mt-[48px]">
                <div className="nx-text-[24px] nx-font-medium">AI Agents</div>
                <div>Secure communication and a robust network to build excellent autonomous agents.</div>
            </div>
            <div className={styles.startGuides}>
                <div
                    className="nx-grid nx-grid-cols-1 nx-w-full sm:nx-grid-cols-2 md:nx-grid-cols-3 lg:nx-grid-cols-3 nx-gap-6 sm:nx-h-[270px]">

                    <Link href="www.google.com" target="_blank"
                          className="nx-col-span-1 nx-block boxColor nx-rounded-lg  nx-p-[24px] nx-hover:bg-[#ECEEF1] flex nx-flex-col nx-overflow-hidden nx-relative nx-bg-center  nx-items-center"
                           >
                        <div className="nx-flex">
                            <Image src={asi_icon} alt="asi icon" className="nx-mr-3"/>
                            <div>
                        <div className="nx-text-white nx-text-[12px] nx-font-medium nx-uppercase">Getting started with
                        </div>
                        <div className=" nx-text-white nx-text-[20px] nx-font-medium">Agentverse</div></div>
                        </div>
                         <Image src={hotel} alt="hotel icon" className="nx-absolute nx-visible nx-bottom-0 nx-left-1   nx-object-cover img-clear"/>
                    </Link>

                    <Link href="www.google.com" target="_blank"
                          className="nx-col-span-1 nx-block boxColor nx-rounded-lg nx-p-[24px] nx-hover:bg-[#ECEEF1] flex nx-flex-col nx-overflow-hidden nx-relative nx-bg-center  nx-items-center"
                           >
                        <div className="nx-flex">
                            <Image src={asi_icon} alt="asi icon" className="nx-mr-3"/>
                            <div>
                        <div className="nx-text-white nx-text-[12px] nx-font-medium nx-uppercase">Getting started with
                        </div>
                        <div className=" nx-text-white nx-text-[20px] nx-font-medium">ASI:One</div></div>
                        </div>
                         <Image src={conversation} alt="conversation icon" height={151} className="nx-absolute nx-visible nx-bottom-0 nx-left-1 nx-object-cover img-clear"/>
                    </Link>

                    <Link href="www.google.com" target="_blank"
                          className="nx-col-span-1 nx-block boxColor nx-rounded-lg nx-p-[24px] nx-hover:bg-[#ECEEF1] flex nx-flex-col nx-overflow-hidden nx-relative nx-bg-center  nx-items-center"
                           >
                        <div className="nx-flex">
                            <Image src={asi_icon} alt="asi icon" className="nx-mr-3"/>
                            <div>
                        <div className="nx-text-white nx-text-[12px] nx-font-medium nx-uppercase">Getting started with
                        </div>
                        <div className=" nx-text-white nx-text-[20px] nx-font-medium">uAgents</div></div>
                        </div>
                         <Image src={conversation} alt="conversation icon" height={151} className="nx-absolute nx-visible nx-bottom-0 nx-left-1 nx-object-cover img-clear"/>
                    </Link>

                </div>
            </div>


            <div className="nx-mt-[48px]">
                <div className="nx-text-[24px] nx-font-medium">uAgents</div>
                <div>Python library for dyanmic Multiagent systems and AI Agents, made simple.</div>
            </div>

            <div className={styles.startGuides}>
                <div className="nx-grid nx-grid-cols-1 nx-w-full sm:nx-grid-cols-2 md:nx-grid-cols-4 lg:nx-grid-cols-4 nx-gap-6 sm:nx-h-[100px]">

                    <Link href="www.google.com" target="_blank"
                          className="nx-col-span-1 nx-block boxColor nx-rounded-lg nx-p-[24px] nx-hover:bg-[#ECEEF1] nx-flex nx-flex-col nx-justify-center ">
                        <div className="nx-text-white nx-text-[12px] nx-font-medium nx-uppercase">Build a simple</div>
                        <div className="nx-text-white nx-text-[20px] nx-font-medium">RAG agent</div>
                    </Link>

                    <Link href="www.google.com" target="_blank"
                          className="nx-col-span-1 nx-block boxColor nx-rounded-lg nx-p-[24px] nx-hover:bg-[#ECEEF1] nx-flex nx-flex-col nx-justify-center">
                        <div className="nx-text-white nx-text-[12px] nx-font-medium nx-uppercase">Getting started with
                        </div>
                        <div className="nx-text-white nx-text-[20px] nx-font-medium">ChatProtocol</div>
                    </Link>

                    <Link href="www.google.com" target="_blank"
                          className="nx-col-span-1 nx-block boxColor nx-rounded-lg nx-p-[24px] nx-hover:bg-[#ECEEF1] nx-flex nx-flex-col nx-justify-center">
                        <div className="nx-text-white nx-text-[12px] nx-font-medium nx-uppercase">Utilise</div>
                        <div className="nx-text-white nx-text-[20px] nx-font-medium">Agent Mailbox</div>
                    </Link>

                    <Link href="www.google.com" target="_blank"
                          className="nx-col-span-1 nx-block boxColor nx-rounded-lg nx-p-[24px] nx-hover:bg-[#ECEEF1] nx-flex nx-flex-col nx-justify-center">
                        <div className="nx-text-white nx-text-[12px] nx-font-medium nx-uppercase">Build a simple</div>
                        <div className="nx-text-white nx-text-[20px] nx-font-medium">Multi Agent System</div>
                    </Link>

                </div>
            </div>

            <div className="nx-mt-[48px]">
                <div className="nx-text-[24px] nx-font-medium">Agentverse</div>
                <div>For simple agent hosting and management</div>
            </div>

            <div className={styles.startGuides}>
                <div
                    className="nx-grid nx-grid-cols-1 nx-w-full sm:nx-grid-cols-2 md:nx-grid-cols-2 lg:nx-grid-cols-2 nx-gap-6 ">


                    <Link href="www.google.com" target="_blank"
                          className="nx-col-span-1 nx-block boxColor nx-rounded-lg nx-p-4 nx-hover:bg-[#ECEEF1] nx-flex-col nx-items-center nx-h-[340px]"
                          >
                        <div className="nx-text-white nx-text-[12px] nx-font-medium nx-uppercase">Getting started with
                        </div>
                        <div className="nx-text-white nx-text-[20px] nx-font-medium">Agentverse Templates</div>
                    </Link>

                    <Link href="www.google.com" target="_blank"

                        className="nx-col-span-1 nx-block boxColor nx-rounded-lg nx-p-[24px] nx-hover:bg-[#ECEEF1] flex nx-flex-col nx-overflow-hidden nx-relative nx-bg-center  nx-items-center nx-h-[340px]">
                        <div className="nx-text-white nx-text-[12px] nx-font-medium nx-uppercase">Test your agent with
                            agentverse
                        </div>
                        <div className="nx-text-white nx-text-[20px] nx-font-medium">Chat</div>

                        <Image src={context} alt="hotel icon" className="nx-absolute nx-visible nx-bottom-0 nx-object-cover"/>
                    </Link>

                    <Link href="www.google.com" target="_blank"
                          className="nx-col-span-1 nx-block boxColor nx-rounded-lg nx-p-4 nx-hover:bg-[#ECEEF1]  nx-flex-col nx-items-center nx-h-[340px]">
                        <div className="nx-text-white nx-text-[12px] nx-font-medium nx-uppercase">A SIMPLE guide to help
                            you
                        </div>
                        <div className="nx-text-white nx-text-[20px] nx-font-medium">Deploy and host your agents</div>
                    </Link>

                    <Link href="www.google.com" target="_blank"
                          className="nx-col-span-1 nx-block boxColor nx-rounded-lg nx-p-[24px] nx-hover:bg-[#ECEEF1] flex nx-flex-col nx-overflow-hidden nx-relative nx-bg-center  nx-items-center nx-h-[340px]">
                        <div className="nx-text-white nx-text-[12px] nx-font-medium nx-uppercase">Search and discover
                            agents with
                        </div>
                        <div className="nx-text-white nx-text-[20px] nx-font-medium">The Marketplace</div>

                         <Image src={marketplace} alt="hotel icon" className="nx-absolute nx-visible nx-bottom-0    nx-object-cover"/>
                    </Link>
                </div>
            </div>


            <div className="nx-mt-[48px]">
                <div className="nx-text-[24px] nx-font-medium">Network</div>
                <div>Smart contracts and agent payments.</div>
            </div>
            <div className={styles.startGuides}>
                <div
                    className="nx-grid nx-grid-cols-1 nx-w-full sm:nx-grid-cols-2 md:nx-grid-cols-2 lg:nx-grid-cols-2 nx-gap-6">

                    <Link href="www.google.com" target="_blank"
                          className="nx-col-span-1 nx-block boxColor nx-rounded-lg  nx-p-[24px] nx-hover:bg-[#ECEEF1] flex nx-flex-col nx-overflow-hidden nx-relative nx-bg-center  nx-items-center"
                           >
                        <div className="nx-flex">
                            <Image src={asi_icon} alt="asi icon" className="nx-mr-3"/>
                            <div>
                        <div className="nx-text-white nx-text-[12px] nx-font-medium nx-uppercase">Getting started with
                        </div>
                        <div className=" nx-text-white nx-text-[20px] nx-font-medium">Ledger</div></div>
                        </div>

                    </Link>

                    <Link href="www.google.com" target="_blank"
                          className="nx-flex boxColor nx-rounded-lg nx-p-4 nx-hover:bg-[#ECEEF1] nx-flex nx-flex-col nx-justify-center nx-h-[96px] nx-gap-2">
                            <div className="nx-text-white nx-text-[20px] nx-font-medium ">Almanac</div>
                            <div className="nx-text-white nx-text-[12px] nx-font-medium nx-uppercase ">Public contract
                                fo all agents
                            </div>
                    </Link>


                    <Link href="www.google.com" target="_blank"
                          className="nx-flex boxColor nx-rounded-lg nx-p-4 nx-hover:bg-[#ECEEF1] nx-flex nx-flex-col nx-justify-center nx-h-[96px] nx-gap-2">
                            <div className="nx-text-white nx-text-[20px] nx-font-medium ">Cosmpy</div>
                            <div className="nx-text-white nx-text-[12px] nx-font-medium nx-uppercase ">Python library
                                for cosmos based blockchains
                            </div>
                    </Link>

                    <Link href="www.google.com" target="_blank"
                          className="nx-flex boxColor nx-rounded-lg nx-p-4 nx-hover:bg-[#ECEEF1] nx-flex nx-flex-col nx-justify-center nx-h-[96px] nx-gap-2">
                        <div className="nx-text-white nx-text-[20px] nx-font-medium ">Wallet</div>
                            <div className="nx-text-white nx-text-[12px] nx-font-medium nx-uppercase ">TOKEN management
                                and agent interaction
                            </div>
                    </Link>


                </div>
            </div>

        </section>
    </section>
  );
}

export default function MyApp() {
    return <LandingPage/>;
}
