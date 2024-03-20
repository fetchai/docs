import React from "react";
import Image from "next/image";
import documentationLogo from "../src/svgs/docs.svg";
import fetchLogo from "../src/svgs/fetch-logo.svg";

const Logo: React.FC = () => {
  return (
    <div className="nx-flex nx-gap-3 nx-items-baseline">
      <Image
        onClick={() => window.open("https://fetch.ai")}
        width={145}
        height={24}
        src={fetchLogo}
        className="hover:nx-opacity-75"
        alt="fetch-logo"
      />
      <Image
        onClick={() => window.open("https://fetch.ai/docs", "_self")}
        width={39}
        height={17}
        src={documentationLogo}
        className="hover:nx-opacity-75"
        alt="fetch-logo"
      />
    </div>
  );
};

export default Logo;
