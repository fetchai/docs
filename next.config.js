const withNextra = require("nextra")({
  theme: "./theme/fetch-ai-docs",
  themeConfig: "./theme.config.tsx",
});

module.exports = withNextra({
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
        destination: "/concepts/agent-services/agentverse-intro#why-agentverse",
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
        source: "/examples/react_example",
        destination: "/examples/intermediate/react_example",
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
    ];
  },
});
