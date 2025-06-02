"use client";
import React, { useState } from "react";
import ChatWindow from "./chat-window";
import Image from "next/image";
import FetchWhite from "src/images/fetch_logo_only_white.svg";

const ChatWithUs = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="nx-fixed nx-bottom-12 nx-right-12 !nx-px-6 !nx-py-4 nx-z-40 nx-flex nx-bg-chatwithus nx-uppercase nx-font-medium geist-mono-font-family nx-text-white nx-rounded-lg nx-gap-2"
      >
        <Image
          src={FetchWhite}
          alt="agentverse-img"
          width={16}
          height={16}
          className="nx-w-[16px] nx-h-[16px] nx-my-auto"
        />
        Chat with us
      </button>
      {isChatOpen && <ChatWindow onClose={() => setIsChatOpen(false)} />}
    </>
  );
};

export default ChatWithUs;
