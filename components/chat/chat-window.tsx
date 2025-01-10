"use client";
import React, { useState } from "react";
import Image from "next/image";
import { SendIcon } from "src/icons/shared-icons";
import FetchWhite from "src/images/fetch_logo_only_white.svg";
import MarkdownRenderer from "./mark-down-render";
interface ChatWindowProps {
  onClose: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<
    { type: "user" | "ai"; text: string }[]
  >([
    { type: "ai", text: "Hi there! 👋 Welcome to our chat." },
    { type: "ai", text: "How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { type: "user", text: input }]);
    setInput("");
    setIsTyping(true);
    try {
      const response = await fetch("/docs/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();
      setTimeout(() => {
        setMessages((prev) => [...prev, { type: "ai", text: data.reply }]);
        setIsTyping(false);
      }, 1500);
    } catch (error) {
      console.log("error", error);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            type: "ai",
            text: "Sorry, something went wrong. Please try again.",
          },
        ]);
        setIsTyping(false);
      }, 1500);
    }
  };

  return (
    <div className="nx-fixed nx-bottom-0 md:nx-bottom-3 nx-right-0 md:nx-right-3 nx-w-full nx-max-w-md dark:nx-bg-[#242630] nx-bg-[#F3F5F8] nx-shadow-xl nx-rounded-xl nx-z-[51] nx-pb-6">
      <div className="nx-flex nx-justify-between nx-items-center dark:nx-bg-none nx-bg-gradient-to-b  nx-py-3 nx-from-[rgba(95,56,251,0.1)] nx-to-[rgba(208,234,255,0.1)] nx-rounded-xl nx-px-6">
        <div className="tooltip">
          <div className="nx-p-1 nx-bg-[#5f38fb] nx-font-normal nx-text-sm nx-rounded-md nx-text-white">
            Beta
          </div>
          <div className="tooltip-text nx-p-2">
            Our chat agent is in training, and results will improve with use
          </div>
        </div>
        <button onClick={onClose} className="nx-text-[#000D3D]">
          &#x2715;
        </button>
      </div>
      <div className="nx-px-6 ">
        <div className="nx-space-y-2 nx-h-[calc(100vh-400px)] nx-md:!h-[464px] nx-overflow-y-auto">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`nx-flex ${
                msg.type === "user" ? "nx-justify-end" : "nx-justify-start"
              }`}
            >
              {msg.type === "ai" ? (
                <div className="nx-w-6 nx-h-6 nx-rounded-full nx-bg-white nx-mt-2 nx-mr-2 nx-flex nx-justify-center nx-items-center">
                  <div className="nx-w-4 nx-h-4 nx-rounded-full nx-bg-[#0B1742] nx-flex nx-justify-center nx-items-center">
                    <Image
                      src={FetchWhite}
                      alt="agentverse-img"
                      width={6}
                      height={6}
                      className="nx-w-[6px] nx-h-[6px]"
                    />
                  </div>
                </div>
              ) : undefined}

              {msg.type === "user" ? (
                <p
                  className={`nx-px-4 nx-py-3 nx-rounded-lg nx-text-sm nx-my-1 nx-text-[#000D3D] dark:nx-text-white dark:nx-bg-[#363841] nx-bg-[#FCFCFD]`}
                >
                  {msg.text}
                </p>
              ) : (
                <p
                  className={`nx-px-4 nx-py-3 nx-rounded-lg nx-text-sm nx-max-w-[350px] nx-my-1 nx-text-[#000D3D] dark:nx-text-white dark:nx-bg-[#363841] nx-bg-white`}
                >
                  <MarkdownRenderer markdownContent={msg.text} />
                </p>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="nx-flex nx-justify-start">
              <div className="nx-w-6 nx-h-6 nx-rounded-full nx-bg-white nx-mt-2 nx-mr-2 nx-flex nx-justify-center nx-items-center">
                <div className="nx-w-4 nx-h-4 nx-rounded-full nx-bg-[#0B1742] nx-flex nx-justify-center nx-items-center">
                  <Image
                    src={FetchWhite}
                    alt="agentverse-img"
                    width={6}
                    height={6}
                    className="nx-w-[6px] nx-h-[6px]"
                  />
                </div>
              </div>
              <div className="nx-bg-white dark:nx-bg-[#363841] nx-text-[#000D3D] nx-px-4 nx-py-3 nx-rounded-lg nx-flex nx-items-center nx-space-x-1">
                <span className="dot-animation"></span>
                <span className="dot-animation"></span>
                <span className="dot-animation"></span>
              </div>
            </div>
          )}
        </div>
        <div className="nx-p-4 nx-h-[56px] nx-w-full nx-bg-white dark:nx-bg-[#363841] nx-rounded-lg">
          <div className="nx-flex nx-justify-between nx-space-x-2 nx-w-full">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="nx-w-11/12 chat-with-usInput"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <div
              onClick={handleSendMessage}
              className="nx-cursor-pointer nx-w-[14px] nx-h-[14px] nx-ml-3 nx-my-auto"
            >
              <SendIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
