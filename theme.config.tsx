import React from 'react'
import { DocsThemeConfig } from './theme/fetch-ai-docs'
import Footer from './components/footer'
import Logo from './components/Logo'

const config: DocsThemeConfig = {
  logo: <Logo/>,
  project: {
    link: 'https://github.com/fetchai',
  },
  chat: {
    link: 'https://discord.gg/fetchai',
  },
  docsRepositoryBase: 'https://github.com/shuding/nextra-docs-template',
  footer: {
    component: <Footer/>
  },
  search: {
    placeholder: 'Search in documentation'
  }
}


export default config
