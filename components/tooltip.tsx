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
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="icon"
              >
                <path d="M10 9C9.73479 9 9.48043 9.10536 9.2929 9.29289C9.10536 9.48043 9 9.73478 9 10V14C9 14.2652 9.10536 14.5196 9.2929 14.7071C9.48043 14.8946 9.73479 15 10 15C10.2652 15 10.5196 14.8946 10.7071 14.7071C10.8946 14.5196 11 14.2652 11 14V10C11 9.73478 10.8946 9.48043 10.7071 9.29289C10.5196 9.10536 10.2652 9 10 9ZM10.38 5.08C10.1365 4.97998 9.86347 4.97998 9.62 5.08C9.49725 5.12759 9.38511 5.19896 9.29 5.29C9.20167 5.3872 9.13065 5.49882 9.08 5.62C9.02402 5.73868 8.99662 5.86882 9 6C8.99924 6.13161 9.02447 6.26207 9.07423 6.38391C9.124 6.50574 9.19732 6.61656 9.29 6.71C9.38721 6.79833 9.49882 6.86936 9.62 6.92C9.7715 6.98224 9.93597 7.00632 10.099 6.99011C10.2619 6.97391 10.4184 6.91792 10.5547 6.82707C10.691 6.73622 10.8029 6.61328 10.8805 6.46907C10.9582 6.32486 10.9992 6.16378 11 6C10.9963 5.73523 10.8927 5.48163 10.71 5.29C10.6149 5.19896 10.5028 5.12759 10.38 5.08ZM10 0C8.02219 0 6.08879 0.58649 4.4443 1.6853C2.79981 2.78412 1.51809 4.3459 0.761209 6.17317C0.00433284 8.00043 -0.193701 10.0111 0.192152 11.9509C0.578004 13.8907 1.53041 15.6725 2.92894 17.0711C4.32746 18.4696 6.10929 19.422 8.0491 19.8079C9.98891 20.1937 11.9996 19.9957 13.8268 19.2388C15.6541 18.4819 17.2159 17.2002 18.3147 15.5557C19.4135 13.9112 20 11.9778 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7363 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0ZM10 18C8.41775 18 6.87104 17.5308 5.55544 16.6518C4.23985 15.7727 3.21447 14.5233 2.60897 13.0615C2.00347 11.5997 1.84504 9.99113 2.15372 8.43928C2.4624 6.88743 3.22433 5.46197 4.34315 4.34315C5.46197 3.22433 6.88743 2.4624 8.43928 2.15372C9.99113 1.84504 11.5997 2.00346 13.0615 2.60896C14.5233 3.21447 15.7727 4.23984 16.6518 5.55544C17.5308 6.87103 18 8.41775 18 10C18 12.1217 17.1572 14.1566 15.6569 15.6569C14.1566 17.1571 12.1217 18 10 18Z" />
              </svg>
            </div>
            {tooltip && (
              <div
                id="tooltip"
                role="tooltip"
                className={`nx-z-20 ${
                  boundary && "nx-bottom-10"
                } nx-w-64 nx-absolute nx-transition nx-duration-150 nx-ease-in-out nx-left-0 nx-ml-8 nx-shadow-lg nx-bg-white dark:nx-bg-dark-mode-white-2 nx-p-4 nx-rounded`}
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
