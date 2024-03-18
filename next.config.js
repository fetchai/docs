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
    ];
  },
});
