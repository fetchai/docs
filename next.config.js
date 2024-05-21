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
        destination: "/guides/agentverse/agentverse-functions/services",
        permanent: true,
      },
      {
        source: "/guides/services/field-descriptions-for-deltav",
        destination: "/guides/agentverse/agentverse-functions/field-descriptions-for-deltav",
        permanent: true,
      },
      {
        source: "/guides/agentverse/registering-agent-services",
        destination: "/guides/agentverse/agentverse-functions/registering-agent-services",
        permanent: true,
      },

      {
        source: "/guides/agentverse/registering-agent-coin-toss",
        destination: "/guides/agentverse/agentverse-functions/registering-agent-coin-toss",
        permanent: true,
      },
      {
        source: "/guides/agentverse/creating-a-hosted-agent",
        destination: "/guides/agentverse/creating-agentverse-agents/creating-a-hosted-agent",
        permanent: true,
      },
      {
        source: "/guides/agentverse/utilising-the-mailbox",
        destination: "/guides/agentverse/agentverse-mailbox/utilising-the-mailbox",
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
    ];
  },
});
