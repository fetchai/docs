import React from "react";
import Image from "next/image";
import darkFetchLogo from "../src/svgs/dark-fetch-logo.svg";

const DarkLogo: React.FC = () => {
  return (
    <div className="nx-flex nx-gap-3 nx-items-baseline">
      <Image
        width={214}
        height={24}
        src={darkFetchLogo}
        className="hover:nx-opacity-75"
        alt="fetch-logo"
      />
    </div>
  );
};

export default DarkLogo;
