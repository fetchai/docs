const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

const withNextra = require("nextra")({
  theme: "./theme/fetch-ai-docs",
  themeConfig: "./theme.config.tsx",
});

module.exports = (phase, { defaultConfig }) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;

  if (isDev) {
    console.log("Development mode!");
  }

  let nextConfig = withNextra({
    basePath: "/docs",

    async redirects() {
      return [
        {
          source: "/concepts/deltav/intro",
          destination: "/concepts/ai-engine/deltav",
          permanent: true,
        },
        {
          source: "/concepts/agent-services/why-agentverse",
          destination:
            "/concepts/agent-services/agentverse-intro#why-agentverse",
          permanent: true,
        },
        {
          source: "/concepts/agents/rationale",
          destination: "/concepts/agents/agents#why-ai-agents",
          permanent: true,
        },
        {
          source: "/guides/integrations/:path*",
          destination: "https://fetch.ai/integrations",
          permanent: true,
        },
        {
          source: "/concepts/agent-services/services",
          destination: "/guides/services/services",
          permanent: true,
        },
        {
          source: "/apis/agentverse",
          destination: "/apis/agentverse/almanac",
          permanent: true,
        },
        {
          source: "/apis/ai-engine",
          destination: "/apis/ai-engine/chat",
          permanent: true,
        },
        {
          source: "/guides/services/services",
          destination: "/guides/agents/intermediate/agent-functions",
          permanent: true,
        },
        {
          source: "/guides/services/field-descriptions-for-deltav",
          destination:
            "/guides/agentverse/agentverse-functions/field-descriptions-for-deltav",
          permanent: true,
        },
        {
          source: "/guides/agentverse/registering-agent-services",
          destination:
            "/guides/agentverse/agentverse-functions/registering-agent-services",
          permanent: true,
        },
        {
          source: "/guides/agentverse/allowed-imports",
          destination:
            "/guides/agentverse/creating-agentverse-agents/allowed-imports",
          permanent: true,
        },

        {
          source: "/guides/agentverse/registering-agent-coin-toss",
          destination:
            "/guides/agentverse/agentverse-functions/registering-agent-coin-toss",
          permanent: true,
        },
        {
          source: "/guides/agentverse/creating-a-hosted-agent",
          destination:
            "/guides/agentverse/creating-agentverse-agents/creating-a-hosted-agent",
          permanent: true,
        },
        {
          source: "/guides/agentverse/utilising-the-mailbox",
          destination:
            "/guides/agentverse/agentverse-mailbox/utilising-the-mailbox",
          permanent: true,
        },
        {
          source: "/guides/avctl/avctl",
          destination: "/guides/agentverse/avctl/avctl",
          permanent: true,
        },
        {
          source: "/guides/avctl/avctl-hosting",
          destination: "/guides/agentverse/avctl/avctl-hosting",
          permanent: true,
        },
        {
          source: "/guides/agents/installing-uagent",
          destination: "/guides/agents/getting-started/installing-uagent",
          permanent: true,
        },
        {
          source: "/guides/agents/create-a-uagent",
          destination: "/guides/agents/getting-started/create-a-uagent",
          permanent: true,
        },
        {
          source: "/guides/agents/communicating-with-other-agents",
          destination:
            "/guides/agents/intermediate/communicating-with-other-agents",
          permanent: true,
        },
        {
          source: "/guides/agents/storage-function",
          destination: "/guides/agents/intermediate/storage-function",
          permanent: true,
        },
        {
          source: "/concepts/agents/public-private-agents",
          destination: "/guides/agents/intermediate/public-private-agents",
          permanent: true,
        },
        {
          source: "/guides/agents/send-tokens",
          destination: "/guides/agents/intermediate/send-tokens",
          permanent: true,
        },
        {
          source: "/guides/agents/dialogues",
          destination: "/guides/agents/advanced/dialogues",
          permanent: true,
        },
        {
          source: "/guides/agents/register-in-almanac",
          destination: "/guides/agents/advanced/register-in-almanac",
          permanent: true,
        },
        {
          source: "/guides/agents/interval-task",
          destination:
            "/guides/agents/intermediate/handlers#creating-an-interval-task-with-on_interval-handler",
          permanent: true,
        },
        {
          source: "/guides/agents/on-query",
          destination:
            "/guides/agents/intermediate/handlers#answer-queries-with-on_query-handler",
          permanent: true,
        },
        {
          source: "/guides/agents/broadcast",
          destination:
            "/guides/agents/intermediate/handlers#handle-messages-using-the-on_message-handler",
          permanent: true,
        },
        {
          source: "/guides/agents/getting-uagent-address",
          destination: "/guides/agents/getting-started/getting-uagent-address",
          permanent: true,
        },
        {
          source: "/guides/agents/running-locally",
          destination:
            "/guides/agents/intermediate/agent-functions#local-agent-function-registration",
          permanent: true,
        },
        {
          source: "/concepts/agents/agents",
          destination: "/guides/agents/getting-started/whats-an-agent",
          permanent: true,
        },
        {
          source: "/guides/agents/locally-running-langchain-integration",
          destination: "/guides/agents/intermediate/ai-engine-compatible-agent",
          permanent: true,
        },
        {
          source: "/guides/agents/message-verification",
          destination: "/guides/agents/advanced/message-verification",
          permanent: true,
        },
        {
          source: "/guides/agentverse/agentverse-functions/services",
          destination: "/guides/agents/intermediate/agent-functions",
          permanent: true,
        },
        {
          source:
            "/guides/agentverse/huggingface-text-classification-model-agent",
          destination: "/examples/hugging-face-agent",
          permanent: true,
        },
        {
          source: "/guides/agents/booking-demo",
          destination: "/examples/table-booking-demo",
          permanent: true,
        },
        {
          source: "/examples/first-agent",
          destination: "/examples/getting-started/first-agent",
          permanent: true,
        },
        {
          source: "/examples/agents-interval-task",
          destination: "/examples/intermediate/agents-interval-task",
          permanent: true,
        },
        {
          source: "/examples/simple-agent-communication",
          destination: "/examples/intermediate/simple-agent-communication",
          permanent: true,
        },
        {
          source: "/examples/local-communication",
          destination: "/examples/intermediate/local-communication",
          permanent: true,
        },
        {
          source: "/examples/multiple-agents",
          destination: "/examples/intermediate/multiple-agents",
          permanent: true,
        },
        {
          source: "/examples/storage",
          destination: "/examples/intermediate/storage",
          permanent: true,
        },
        {
          source: "/examples/send-tokens-agents",
          destination: "/examples/intermediate/send-tokens-agents",
          permanent: true,
        },
        {
          source: "/examples/verify-messages",
          destination: "/examples/intermediate/verify-messages",
          permanent: true,
        },
        {
          source: "/examples/agents-cleaning-demo",
          destination: "/examples/intermediate/agents-cleaning-demo",
          permanent: true,
        },
        {
          source: "/examples/table-booking-demo",
          destination: "/examples/intermediate/table-booking-demo",
          permanent: true,
        },
        {
          source: "/examples/wallet-messaging",
          destination: "/examples/intermediate/wallet-messaging",
          permanent: true,
        },
        {
          source: "/examples/mailbox-agents",
          destination: "/examples/intermediate/mailbox-agents",
          permanent: true,
        },
        {
          source: "/examples/broadcast",
          destination: "/examples/intermediate/broadcast",
          permanent: true,
        },
        {
          source: "/examples/name-service",
          destination: "/examples/intermediate/name-service",
          permanent: true,
        },
        {
          source: "/examples/on-query-proxy",
          destination: "/examples/intermediate/on-query-proxy",
          permanent: true,
        },
        {
          source: "/examples/dice-roll",
          destination: "/examples/intermediate/dice-roll",
          permanent: true,
        },
        {
          source: "/examples/coin-toss",
          destination: "/examples/intermediate/coin-toss",
          permanent: true,
        },
        {
          source: "/examples/local-agent-registration",
          destination: "/examples/intermediate/local-agent-registration",
          permanent: true,
        },
        {
          source: "/examples/news-reading-system",
          destination: "/examples/intermediate/news-reading-system",
          permanent: true,
        },
        {
          source: "/examples/local-agent-langchain",
          destination: "/examples/intermediate/local-agent-langchain",
          permanent: true,
        },
        {
          source: "/examples/hugging-face-agent",
          destination: "/examples/intermediate/hugging-face-agent",
          permanent: true,
        },
        {
          source: "/examples/on-query",
          destination: "/examples/intermediate/on-query",
          permanent: true,
        },
        {
          source: "/examples/agent-and-service-api",
          destination: "/examples/intermediate/agent-and-service-api",
          permanent: true,
        },
        {
          source: "/examples/agent-secret-api",
          destination: "/examples/intermediate/agent-secret-api",
          permanent: true,
        },
        {
          source: "/examples/intermediate/react_example",
          destination: "/examples/react-example",
          permanent: true,
        },
        {
          source: "/examples/open-dialogue-chitchat",
          destination: "/examples/advanced/open-dialogue-chitchat",
          permanent: true,
        },
        {
          source: "/examples/predefined-dialogue-chitchat",
          destination: "/examples/advanced/predefined-dialogue-chitchat",
          permanent: true,
        },
        {
          source: "/examples/chat-api-example",
          destination: "/examples/advanced/chat-api-example",
          permanent: true,
        },
        {
          source: "/examples/chat_api_example",
          destination: "/examples/advanced/chat_api_example",
          permanent: true,
        },
        {
          source: "/examples/deltaV-dialogues",
          destination: "/examples/advanced/deltaV-dialogues",
          permanent: true,
        },
        {
          source: "/guides/agents/intermediate/options-for-running-your-agents",
          destination:
            "/guides/agents/intermediate/options-for-running-local-agents",
          permanent: true,
        },
        {
          source: "/guides/deltav/deltav-chat-interface",
          destination:
            "/concepts/ai-engine/powering-connections-and-smart-operations-in-deltav",
          permanent: true,
        },
        {
          source: "/examples/advanced/chat-api-example",
          destination: "/examples/advanced/chat_api_example",
          permanent: true,
        },
        {
          source: "/guides/agents/cleaning-demo",
          destination: "/examples/intermediate/agents-cleaning-demo",
          permanent: true,
        },
        {
          source:
            "/guides/fetch-network/fetch-wallet/fetch-wallet-hardware-connection-guide",
          destination:
            "/guides/fetch-network/asi-wallet/asi-wallet-hardware-connection-guide",
          permanent: true,
        },
        {
          source: "/guides/fetch-network/fetch-wallet/web-wallet/get-started",
          destination:
            "/guides/fetch-network/asi-wallet/web-wallet/get-started",
          permanent: true,
        },
        {
          source: "/guides/fetch-network/fetch-wallet/web-wallet/home-screen",
          destination:
            "/guides/fetch-network/asi-wallet/web-wallet/home-screen",
          permanent: true,
        },
        {
          source: "/guides/fetch-network/fetch-wallet/web-wallet/stake",
          destination: "/guides/fetch-network/asi-wallet/web-wallet/stake",
          permanent: true,
        },
        {
          source: "/guides/fetch-network/fetch-wallet/web-wallet/send-receive",
          destination:
            "/guides/fetch-network/asi-wallet/web-wallet/send-receive",
          permanent: true,
        },
        {
          source: "/guides/fetch-network/fetch-wallet/web-wallet/activity",
          destination: "/guides/fetch-network/asi-wallet/web-wallet/activity",
          permanent: true,
        },
        {
          source: "/guides/fetch-network/fetch-wallet/web-wallet/more",
          destination: "/guides/fetch-network/asi-wallet/web-wallet/more",
          permanent: true,
        },
        {
          source: "/guides/fetch-network/fetch-wallet/web-wallet/gov-proposal",
          destination:
            "/guides/fetch-network/asi-wallet/web-wallet/gov-proposal",
          permanent: true,
        },
        {
          source:
            "/guides/fetch-network/fetch-wallet/mobile-wallet/get-started",
          destination:
            "/guides/fetch-network/asi-wallet/mobile-wallet/get-started",
          permanent: true,
        },
        {
          source:
            "/guides/fetch-network/fetch-wallet/mobile-wallet/home-screen",
          destination:
            "/guides/fetch-network/asi-wallet/mobile-wallet/home-screen",
          permanent: true,
        },
        {
          source: "/guides/fetch-network/fetch-wallet/mobile-wallet/stake",
          destination: "/guides/fetch-network/asi-wallet/mobile-wallet/stake",
          permanent: true,
        },
        {
          source:
            "/guides/fetch-network/fetch-wallet/mobile-wallet/send-receive",
          destination:
            "/guides/fetch-network/asi-wallet/mobile-wallet/send-receive",
          permanent: true,
        },
        {
          source: "/guides/fetch-network/fetch-wallet/mobile-wallet/activity",
          destination:
            "/guides/fetch-network/asi-wallet/mobile-wallet/activity",
          permanent: true,
        },
        {
          source: "/guides/fetch-network/fetch-wallet/mobile-wallet/more",
          destination: "/guides/fetch-network/asi-wallet/mobile-wallet/more",
          permanent: true,
        },
        {
          source:
            "/guides/fetch-network/fetch-wallet/mobile-wallet/gov-proposal",
          destination:
            "/guides/fetch-network/asi-wallet/mobile-wallet/gov-proposal",
          permanent: true,
        },
        {
          source: "/examples/easy/first-agent",
          destination: "/examples/agent/first-agent",
          permanent: true,
        },
        {
          source: "/examples/easy/agents-interval-task",
          destination: "/examples/agent/agents-interval-task",
          permanent: true,
        },
        {
          source: "/examples/easy/local-communication",
          destination: "/examples/agent/local-communication",
          permanent: true,
        },
        {
          source: "/examples/easy/simple-agent-communication-with-bureau",
          destination: "/examples/agent/simple-agent-communication-with-bureau",
          permanent: true,
        },
        {
          source: "/examples/easy/storage",
          destination: "/examples/agent/storage",
          permanent: true,
        },
        {
          source: "/examples/intermediate/broadcast",
          destination: "/examples/agent/broadcast",
          permanent: true,
        },
        {
          source: "/examples/intermediate/multiple-agents",
          destination: "/examples/agent/multiple-agents",
          permanent: true,
        },
        {
          source: "/examples/intermediate/mailbox-agents",
          destination: "/examples/agentverse/mailbox-agents",
          permanent: true,
        },
        {
          source: "/examples/intermediate/on-query-proxy",
          destination: "/examples/agentverse/on-query-proxy",
          permanent: true,
        },
        {
          source: "/examples/intermediate/dice-roll",
          destination: "/examples/DeltaV/dice-roll",
          permanent: true,
        },
        {
          source: "/examples/intermediate/coin-toss",
          destination: "/examples/DeltaV/coin-toss",
          permanent: true,
        },
        {
          source: "/examples/intermediate/on_query_example",
          destination: "/examples/agent/on_query_example",
          permanent: true,
        },
        {
          source: "/examples/intermediate/agents-with-docker",
          destination: "/examples/agent/agents-with-docker",
          permanent: true,
        },
        {
          source: "/examples/intermediate/local-agent-registration",
          destination: "/examples/DeltaV/local-agent-registration",
          permanent: true,
        },
        {
          source: "/examples/intermediate/table-booking-demo",
          destination: "/examples/agent/table-booking-demo",
          permanent: true,
        },
        {
          source: "/examples/intermediate/agents-cleaning-demo",
          destination: "/examples/agent/agents-cleaning-demo",
          permanent: true,
        },
        {
          source: "/examples/intermediate/send-tokens-agents",
          destination: "/examples/agent/send-tokens-agents",
          permanent: true,
        },
        {
          source: "/examples/intermediate/verify-messages",
          destination: "/examples/agent/verify-messages",
          permanent: true,
        },
        {
          source: "/examples/intermediate/wallet-messaging",
          destination: "/examples/agent/wallet-messaging",
          permanent: true,
        },
        {
          source: "/examples/intermediate/name-service",
          destination: "/examples/agentverse/name-service",
          permanent: true,
        },
        {
          source: "/examples/intermediate/news-reading-system",
          destination: "/examples/DeltaV/news-reading-system",
          permanent: true,
        },
        {
          source: "/examples/intermediate/local-agent-langchain",
          destination: "/examples/DeltaV/local-agent-langchain",
          permanent: true,
        },
        {
          source: "/examples/intermediate/on-query",
          destination: "/examples/agent/on-query",
          permanent: true,
        },
        {
          source: "/examples/intermediate/agent-and-function-api",
          destination: "/examples/agentverse-api/agent-and-function-api",
          permanent: true,
        },
        {
          source: "/examples/intermediate/running-an-agent-on-agentverse",
          destination: "/examples/agentverse/running-an-agent-on-agentverse",
          permanent: true,
        },
        {
          source: "/examples/intermediate/agent-secret-api",
          destination: "/examples/agentverse-api/agent-secret-api",
          permanent: true,
        },
        {
          source: "/examples/intermediate/langchain-rag",
          destination: "/examples/rag/langchain-rag",
          permanent: true,
        },
        {
          source:
            "/examples/intermediate/sending-and-verifying-token-transactions-with-agent",
          destination:
            "/examples/agent/sending-and-verifying-token-transactions-with-agent",
          permanent: true,
        },
        {
          source: "/examples/advanced/open-dialogue-chitchat",
          destination: "/examples/dialogues/open-dialogue-chitchat",
          permanent: true,
        },
        {
          source: "/examples/advanced/predefined-dialogue-chitchat",
          destination: "/examples/dialogues/predefined-dialogue-chitchat",
          permanent: true,
        },
        {
          source: "/examples/advanced/async-loops",
          destination: "/examples/agent/async-loops",
          permanent: true,
        },
        {
          source: "/examples/advanced/chat_api_example",
          destination: "/examples/ai-engine-api/chat_api_example",
          permanent: true,
        },
        {
          source: "/examples/advanced/deltaV-dialogues",
          destination: "/examples/dialogues/deltaV-dialogues",
          permanent: true,
        },
        {
          source: "/examples/postgres-database-with-an-agent",
          destination: "/examples/examplestech/postgres-database-with-an-agent",
          permanent: true,
        },
        {
          source: "/examples/react-example",
          destination: "/examples/examplestech/react-example",
          permanent: true,
        },
        {
          source: "/examples/intermediate/hugging-face-agent",
          destination: "/examples/examplestech/hugging-face-agent",
          permanent: true,
        },
        {
          source: "/examples/jupyter-agent",
          destination: "/examples/examplestech/jupyter-agent",
          permanent: true,
        },
        {
          source: "/concepts/fetch-network/indexer",
          destination: "/concepts/fetch-network/intro-fetch-network",
          permanent: true,
        },
        {
          source: "/concepts/fetch-network/indexer/:path*",
          destination: "/concepts/fetch-network/intro-fetch-network",
          permanent: true,
        },
        {
          source: "/references/indexer",
          destination: "/concepts/fetch-network/intro-fetch-network",
          permanent: true,
        },
        {
          source: "/references/indexer/:path*",
          destination: "/concepts/fetch-network/intro-fetch-network",
          permanent: true,
        },
        {
          source: "/concepts/agent-services/agent-explorer",
          destination:
            "/guides/agentverse/creating-agentverse-agents/agent-explorer",
          permanent: true,
        },
      ];
    },
    async headers() {
      return isDev
        ? [
            {
              source: "/(.*)",
              headers: [
                // Prevent clickjacking
                { key: "X-Frame-Options", value: "DENY" },
                {
                  // Prevent XSS attacks
                  key: "X-Content-Type-Options",
                  value: "nosniff",
                },
                {
                  key: "Referrer-Policy",
                  value: "origin-when-cross-origin",
                },
                {
                  // todo: Kindly review these below. You can change to Content-Security-Policy when ready
                  key: "Content-Security-Policy-Report-Only",
                  value: `
                    default-src 'none';
                    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com;
                    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
                    img-src 'self' data: https://elegant-harmony-f8a4c00980.media.strapiapp.com https://cms.sandbox-london-b.fetch-ai.com;
                    font-src 'self' https://fonts.gstatic.com;
                    connect-src *;
                    frame-ancestors 'none';
                    base-uri 'self';
                    `
                    .replace(/\s{2,}/g, " ")
                    .trim(),
                },
              ],
            },
          ]
        : [
            {
              source: "/(.*)",
              headers: [
                { key: "X-Frame-Options", value: "DENY" },
                { key: "X-Content-Type-Options", value: "nosniff" },
                { key: "Referrer-Policy", value: "origin-when-cross-origin" },
                {
                  key: "Strict-Transport-Security",
                  value: "max-age=31536000; includeSubDomains; preload",
                },
                { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
                { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
                {
                  key: "Content-Security-Policy-Report-Only",
                  value:
                    `default-src 'none'; ` +
                    `script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com; ` +
                    `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; ` +
                    `img-src 'self' data: https://elegant-harmony-f8a4c00980.media.strapiapp.com https://cms.sandbox-london-b.fetch-ai.com; ` +
                    `font-src 'self' https://fonts.gstatic.com; ` +
                    `connect-src 'self' https://www.google-analytics.com; ` +
                    `frame-ancestors 'none'; ` +
                    `base-uri 'self';`.replace(/\s{2,}/g, " ").trim(),
                },
              ],
            },
          ];
    },
  });
  return nextConfig;
};
