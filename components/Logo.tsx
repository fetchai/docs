import React from 'react';
import Image from 'next/image';
import docsLogo from '../src/svgs/docs-logo.svg'
import styles from './landing.module.css'

const Logo: React.FC = () => {
  return (
    <Image
        src={docsLogo} 
        alt="Logo"
        className={styles.docsLogo}
      />
   
  );
};

export default Logo;
