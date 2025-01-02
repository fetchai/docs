'use client'
import React, { useState } from 'react'
import ChatWindow from './chat-window'
// import Button from '../button/new-button'
import Image from 'next/image'

const ChatWithUs = () => {
    const [isChatOpen, setIsChatOpen] = useState(false)

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsChatOpen(!isChatOpen)}
                className="nx-fixed nx-bottom-12 nx-right-12 !nx-px-6 !nx-py-4 nx-z-40 nx-flex"
            >
                <Image
                    src="/Images/icons/agent-icon.svg"
                    alt="agentverse-img"
                    width={23}
                    height={24}
                    className="nx-w-6 nx-h-6 nx-my-auto"
                />
                Chat with us
            </button>

            {/* Chat Window */}
            {isChatOpen && <ChatWindow onClose={() => setIsChatOpen(false)} />}
        </>
    )
}

export default ChatWithUs
