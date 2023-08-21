const withNextra = require('nextra')({
  theme: './theme/fetch-ai-docs',
  themeConfig: './theme.config.tsx',
})

module.exports = withNextra({
  basePath: '/docs',
})
