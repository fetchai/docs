const withNextra = require('nextra')({
  theme: './packages/nextra-theme-docs',
  themeConfig: './theme.config.tsx',
})

module.exports = withNextra({
  basePath: '/docs',
})
