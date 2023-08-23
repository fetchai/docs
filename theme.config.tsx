import React from 'react'
import { DocsThemeConfig } from './theme/fetch-ai-docs'

const config: DocsThemeConfig = {
  logo: <span>Fetch.ai Documentation</span>,
  // project: {
  //   link: 'https://github.com/shuding/nextra-docs-template',
  // },
  // chat: {
  //   link: 'https://discord.com',
  // },
  docsRepositoryBase: 'https://github.com/shuding/nextra-docs-template',
  footer: {
    text: 'Fetch.ai 2023',
  },
  search: {
    placeholder: 'Search in documentation'
  }
}


export default config
