import React from "react";
import Image from "next/image";
import fetchLogo from "../src/svgs/fetch-logo.svg";

const Logo: React.FC = () => {
  return (
    <div className="nx-flex nx-gap-3 nx-items-baseline">
      <Image
        width={214}
        height={24}
        src={fetchLogo}
        className="hover:nx-opacity-75"
        alt="fetch-logo"
      />
    </div>
  );
};

export default Logo;
