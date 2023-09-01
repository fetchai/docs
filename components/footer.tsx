import React, { useState } from 'react';
import Image from 'next/image';
import logo from 'src/svgs/logo.svg'
import styles from './landing.module.css'
import { Anchor } from 'theme/fetch-ai-docs/components';
import { renderComponent } from 'theme/fetch-ai-docs/utils';
import { DiscordIcon, GitHubIcon } from 'nextra/icons'
import { useRouter } from 'next/router';


const FooterLink = ({content}) => {
  const router = useRouter()
  const [hover, setHover] = useState<boolean>(false);

  return <section
            onClick={() => {router.push(content.path)}}
            onMouseOver={() => {setHover(true)}}
            onMouseLeave={() => {setHover(false)}}>
    <p className={hover ? "nx-text-purple nx-cursor-pointer nx-text-sm" :"nx-text-gray-600 nx-text-sm"}>{content.description}</p>
  </section>
} 

const Footer: React.FC = () => {
  const developers = [
    {
      description: 'Docs',
      path: '/'
    },
    {
      description: 'AI Agents',
      path: '/'
    },
    {
      description: 'Agentverse.ai',
      path: '/'
    }
  ]

  const company = [
    {
      description: 'Blog',
      path: '/'
    },
    {
      description: 'Fetch.ai Foundation',
      path: '/'
    },
    {
      description: 'Careers',
      path: '/'
    }
  ]

  const legal = [
    {
      description: 'Press and Media',
      path: '/'
    },
    {
      description: 'Privacy Policy',
      path: '/'
    },
    {
      description: 'Terms of Service',
      path: '/'
    }
  ]

  return (
    <footer className={styles.page}>
      <div className={styles.footerPage}>
        <div className="nx-container nx-mx-auto">
          <div className="nx-grid nx-grid-cols-1 sm:nx-grid-cols-1 md:nx-grid-cols-4 lg:nx-grid-cols-4 nx-gap-4">
            <div className="md:nx-col-span-2 nx-mb-8 md:nx-mb-0">
              <Image
                src={logo} 
                alt="Logo"
              />
              <p className="nx-text-gray-600 nx-text-sm nx-mt-8 nx-footer-width-50"> Creating AI platforms and services that let anyone build and deploy AI services at scale, anytime and anywhere.</p>
              <div className="nx-mt-8">
                <p className="nx-text-gray-600 nx-text-sm">
                  © 2023 Fetch.ai. All rights reserved.
                </p>
              </div>
              
              <div className='nx-flex'>
                <Anchor
                  className="nx-p-2 nx-text-current"
                  href='https://discord.gg/fetchai'
                  newWindow
                >
                  {renderComponent(<>
                    <DiscordIcon />
                    <span className="nx-sr-only">Discord</span>
                  </>)}
                </Anchor>

                <Anchor
                  className="nx-p-2 nx-text-current"
                  href='https://github.com/fetchai'
                  newWindow
                >
                  {renderComponent(<>
                    <GitHubIcon />
                    <span className="nx-sr-only">GitHub</span>
                  </>)}
                </Anchor>
              </div>
            </div>

            <div className="md:nx-col-span-2 nx-mb-8 md:nx-mb-0">
            <div className="nx-grid nx-grid-cols-2 sm:nx-grid-cols-2 md:nx-grid-cols-4 lg:nx-grid-cols-4 nx-gap-4">
              <div className="md:nx-col-span-1 md:nx-mb-4">
                <h4 className="nx-text-black nx-font-semibold nx-mb-2">Developers</h4>
                
                {developers.map(content => {
                  return <FooterLink content={content}/>
                })}
              </div>

              <div className="md:nx-col-span-1 md:nx-mb-4">
                <h4 className="nx-text-black nx-font-semibold nx-mb-2">Company</h4>
                {company.map(content => {
                  return <FooterLink content={content}/>
                })}
              </div>

              <div className="md:nx-col-span-1 md:nx-mb-4">
                <h4 className="nx-text-black nx-font-semibold nx-mb-2">Legal</h4>
                {legal.map(content => {
                  return <FooterLink content={content}/>
                })}
              </div>
              </div>
            </div>
          </div>        
        </div>
      </div>
    </footer>

  );
};

export default Footer;
