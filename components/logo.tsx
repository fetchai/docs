import React from "react";
import Image from "next/image";
import fetchLogo from "../src/svgs/docs-logo.svg";
import { useRouter } from "next/router";

const Logo: React.FC = () => {
  const router = useRouter();
  return (
    <div className="nx-flex nx-gap-3 nx-items-baseline">
      <Image
        onClick={() => router.push("/")}
        width={185}
        height={24}
        src={fetchLogo}
        className="hover:nx-opacity-75"
        alt="fetch-logo"
      />
    </div>
  );
};

export default Logo;
