import React from 'react';
import Image from 'next/image';
import logo from 'src/svgs/logo.svg'
import styles from './landing.module.css'
import { Anchor } from 'theme/fetch-ai-docs/components';
import { renderComponent } from 'theme/fetch-ai-docs/utils';
import { DiscordIcon, GitHubIcon } from 'nextra/icons'
import MailIcon from 'src/svgs/mailbox.svg'


const Footer: React.FC = () => {

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
                <p className="nx-text-gray-600 nx-text-sm">
                  Docs<br />
                  AI Agents<br />
                  Agentverse.ai
                </p>
              </div>

              <div className="md:nx-col-span-1 md:nx-mb-4">
                <h4 className="nx-text-black nx-font-semibold nx-mb-2">Company</h4>
                <p className="nx-text-gray-600 nx-text-sm">
                  Blog<br />
                  Fetch.ai Foundation<br />
                  Careers
                </p>
              </div>

              <div className="md:nx-col-span-1 md:nx-mb-4">
                <h4 className="nx-text-black nx-font-semibold nx-mb-2">Legal</h4>
                <p className="nx-text-gray-600 nx-text-sm">
                  Press and Media<br />
                  Privacy Policy<br />
                  Terms of Service
                </p>
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
