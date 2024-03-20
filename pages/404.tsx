import React from "react";
import { useEffect } from "react";

const NotFound = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "/docs";
    }, 10_000);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <div className="nx-flex nx-justify-center  nx-items-center nx-mt-[35vh]">
      <div className="nx-flex nx-p-[32px] nx-gap-8 nx-flex-col gap-[32px] nx-rounded-[12px]">
        <div className="nx-flex nx-gap-2 nx-flex-col nx-justify-start nx-items-start">
          <span className="nx-font-normal nx-text-slate-900 nx-text-5xl">
            404
          </span>
          <span className=" nx-font-normal nx-text-[20px] nx-tracking-[-.2px] nx-opacity-90 nx-text-[#0B1742]">
            Sorry we couldn&apos;t find this page.
          </span>
          <span className="nx-font-normal nx-leading-5 nx-text-[14px]  nx-opacity-60 nx-text-[#000D3D]">
            Right this moment, Agents are figuring out the fix.
          </span>
        </div>
        <div>
          <button
            onClick={() => window.location.replace("/docs")}
            className="nx-bg-[#5F38FB] nx-rounded-md nx-text-[14px] nx-px-4 nx-py-2 nx-text-white"
          >
            Back To HomePage
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
