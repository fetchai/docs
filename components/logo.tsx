import React from "react";
import Image from "next/image";
import fetchLogo from "../src/svgs/fetch-logo.svg";
import darkFetchLogo from "../src/svgs/dark-fetch-logo.svg";
import { useTheme } from "next-themes";

const Logo: React.FC = () => {
  const {theme} = useTheme()
  return (
    <div className="nx-flex nx-gap-3 nx-items-baseline">
     {theme === "dark" ? <Image
        width={214}
        height={24}
        src={darkFetchLogo}
        className="hover:nx-opacity-75"
        alt="fetch-logo"
      /> :
      <Image
        width={214}
        height={24}
        src={fetchLogo}
        className="hover:nx-opacity-75"
        alt="dark-fetch-logo"
      />}
    </div>
  );
};

export default Logo;
