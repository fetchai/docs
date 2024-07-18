import React, { useEffect, useRef, useState } from "react";

const TooltipComponent = ({ children }: { children: React.ReactNode }) => {
  const [tooltip, setTooltip] = useState(false);
  const [boundary, setBoundary] = useState(false);

  const showTooltip = () => {
    setTooltip(true);
  };

  const tooltipRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      if (tooltipRef.current) {
        const componentRect = tooltipRef.current.getBoundingClientRect();
        const distanceToBottom = window.innerHeight - componentRect.bottom;
        const touchThreshold = 350;
        setBoundary(distanceToBottom <= touchThreshold);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const hideTooltip = () => {
    setTooltip(false);
  };
  return (
    <div>
      <div className="flex flex-col items-start px-6 mx-auto nx-container nx-pl-12 md:nx-pl-0 md:items-center">
        <div className="nx-flex-col md:nx-flex-row nx-flex nx-items-center md:nx-justify-center">
          <a
            tabIndex={0}
            role="link"
            aria-label="tooltip"
            className="nx-focus:outline-none nx-focus:ring-gray-300 nx-rounded-full nx-focus:ring-offset-2 nx-focus:ring-2 nx-focus:bg-gray-200 nx-relative nx-mt-20 md:nx-mt-0"
            onMouseOver={showTooltip}
            onFocus={showTooltip}
            onMouseOut={hideTooltip}
          >
            <div ref={tooltipRef} className="nx-cursor-pointer">
              <svg
                aria-haspopup="true"
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-info-circle"
                width="25"
                height="25"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#A0AEC0"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <circle cx="12" cy="12" r="9" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
                <polyline points="11 12 12 12 12 16 13 16" />
              </svg>
            </div>
            {tooltip && (
              <div
                id="tooltip"
                role="tooltip"
                className={`nx-z-20 ${
                  boundary && "nx-bottom-10"
                } nx-w-64 nx-absolute nx-transition nx-duration-150 nx-ease-in-out nx-left-0 nx-ml-8 nx-shadow-lg nx-bg-white nx-p-4 nx-rounded`}
              >
                <svg
                  className="h-full nx-absolute nx-left-0 nx-ml-2 nx-bottom-0 nx-top-0"
                  width="9px"
                  height="16px"
                  viewBox="0 0 9 16"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <g
                    id="Page-1"
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                  >
                    <g
                      id="Tooltips-"
                      transform="translate(-874.000000, -1029.000000)"
                      fill="#FFFFFF"
                    >
                      <g
                        id="Group-3-Copy-16"
                        transform="translate(850.000000, 975.000000)"
                      >
                        <g
                          id="Group-2"
                          transform="translate(24.000000, 0.000000)"
                        >
                          <polygon
                            id="Triangle"
                            transform="translate(4.500000, 62.000000) rotate(-90.000000) translate(-4.500000, -62.000000)"
                            points="4.5 57.5 12.5 66.5 -3.5 66.5"
                          ></polygon>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
                {children}
              </div>
            )}
          </a>
        </div>
      </div>
    </div>
  );
};

export default TooltipComponent;
