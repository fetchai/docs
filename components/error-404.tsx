import React, { ReactNode, useEffect } from "react";
import Image from "next/image";
import Error from "../src/svgs/desktop/404.svg";
import { FeatureGuideTabs } from "./feature-guide-tabs";

const Description = ({ children }: { children: ReactNode }) => (
  <span
    style={{
      color: "rgba(11, 23, 66, 0.8)",
      fontSize: "18px",
      fontWeight: "300",
    }}
  >
    {children}
  </span>
);

const Error404 = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "/docs";
    }, 10_000);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <div className="nx-flex nx-flex-col nx-justify-center nx-items-center">
      <Image alt="error-404" className="nx-w-full nx-h-full" src={Error} />
      <div className="nx-flex nx-gap-6 nx-flex-col nx-justify-center nx-items-center">
        <Description>
          Oops, we can’t find the page you’re looking for.
        </Description>
        <div className="nx-flex nx-flex-col nx-justify-center nx-items-center">
          <Description>
            You can{" "}
            <span
              className="underLineLink"
              onClick={() => window.location.replace("/docs")}
            >
              go back to the homepage or
            </span>
          </Description>

        </div>
      </div>
    </div>
  );
};

export default Error404;
