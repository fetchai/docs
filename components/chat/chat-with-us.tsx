"use client";
import React, { useState } from "react";
import ChatWindow from "./chat-window";
import { AgentIcon } from "src/icons/shared-icons";

const ChatWithUs = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="nx-fixed nx-bottom-12 nx-right-12 !nx-px-6 !nx-py-4 nx-z-40 nx-flex nx-bg-chatwithus nx-text-white nx-rounded-lg nx-font-medium nx-gap-4"
      >
        <AgentIcon />
        Chat with us
      </button>
      {isChatOpen && <ChatWindow onClose={() => setIsChatOpen(false)} />}
    </>
  );
};

export default ChatWithUs;
