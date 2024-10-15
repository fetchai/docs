import React from "react";
import Image from "next/image";
import fetchLogo from "../src/svgs/logo.svg";
import darkfetchLogo from "../src/svgs/dark-fetch-logo.svg";
import { useTheme } from "next-themes";
import { ThemeMode } from "theme/fetch-ai-docs/helpers";

const Logo: React.FC = () => {
  const { resolvedTheme } = useTheme();
  return (
    <div className="nx-flex nx-gap-3 nx-items-baseline">
      <Image
        width={214}
        height={24}
        src={resolvedTheme === ThemeMode.Light ? fetchLogo : darkfetchLogo}
        className="hover:nx-opacity-75"
        alt="fetch-logo"
      />
    </div>
  );
};

export default Logo;
