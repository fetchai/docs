import React from 'react'
import { DocsThemeConfig } from './packages/nextra-theme-docs/src'

const config: DocsThemeConfig = {
  logo: <span>Fetch.ai Documentation</span>,
  project: {
    link: 'https://github.com/shuding/nextra-docs-template',
  },
  chat: {
    link: 'https://discord.com',
  },
  docsRepositoryBase: 'https://github.com/shuding/nextra-docs-template',
  footer: {
    text: 'Fetch.ai 2023',
  },
}

export default config
